const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const db = require('./database');
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

const JWT_SECRET = "1478";

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));


// Middleware ตรวจสอบ Token
const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "No token provided" });

    jwt.verify(token.split(" ")[1], JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        req.user = decoded;
        next();
    });
};

// 📌 **1. ลงทะเบียนลูกค้า**
app.post("/register", (req, res) => {
    const { fullName, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 8);

    db.query("INSERT INTO Customer (FullName, Email, Password) VALUES (?, ?, ?)", [fullName, email, hashPassword], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Customer registered successfully" });
    });
});

// 📌 **2. Login**
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM Customer WHERE Email = ?", [email], (err, results) => {
        if(err){
            return res.status(500).json({message: "Database Error", error: err});
        }

        //ตรวจสอบว่าพบผู้ใช้หรือไม่
        if(results.length === 0){
            return res.status(401).json({message: "Invaild email or password"});
        }

        
        const user = results[0]; //ดึงข้อมูลผู้ใช้จากฐานข้อมูล
        const hashedPassword = user.Password;

        //ตรวจสอบว่ารหัสผ่านถูกต้องหรือไม่
        if(!hashedPassword || !bcrypt.compareSync(password, hashedPassword)){
            return res.status(401).json({message: "Invaild email or password"});
        }

        //สร้าง JWT_SECRET
        const token = jwt.sign(
            {id: user.CustomerID, email: user.Email},
            JWT_SECRET,
            {expiresIn: "2h"}
        );

        res.json({message: "Login Successful", token});
    });
});

// 📌 **3. ดูรายการสินค้า (GET /products)**
app.get("/products", verifyToken, (req, res) => {
    db.query("SELECT * FROM Product", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 📌 **4. เพิ่มสินค้า (POST /products)**
app.post("/products", verifyToken, (req, res) => {
    const { productName, price, stock } = req.body;

    db.query("INSERT INTO Product (ProductName, Price, Stock) VALUES (?, ?, ?)", [productName, price, stock], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Product added successfully", productID: result.insertId });
    });
});

// 📌 **5. แก้ไขสินค้า (PUT /products/:id)**
app.put("/products/:id", verifyToken, (req, res) => {
    const { productName, price, stock } = req.body;
    const { id } = req.params;

    db.query("UPDATE Product SET ProductName = ?, Price = ?, Stock = ? WHERE ProductID = ?",
        [productName, price, stock, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Product updated successfully" });
    });
});

// 📌 **6. ลบสินค้า (DELETE /products/:id)**
app.delete("/products/:id", verifyToken, (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM Product WHERE ProductID = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Product deleted successfully" });
    });
});

// 📌 **7. สร้าง Order (POST /orders)**
app.post("/orders", verifyToken, (req, res) => {
    const { customerID, orderDate, products } = req.body;

    db.query("INSERT INTO `Order` (OrderDate, CustomerID) VALUES (?, ?)", [orderDate, customerID], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const orderID = result.insertId;
        const orderDetails = products.map(p => [orderID, p.productID, p.quantity]);

        db.query("INSERT INTO OrderDetail (OrderID, ProductID, Quantity) VALUES ?", [orderDetails], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Order placed successfully", orderID });
        });
    });
});

// 📌 **8. ดูรายการ Order (GET /orders)**
app.get("/orders", verifyToken, (req, res) => {
    db.query(`SELECT o.OrderID, o.OrderDate, c.FullName, p.ProductName, od.Quantity
              FROM \`Order\` o
              JOIN Customer c ON o.CustomerID = c.CustomerID
              JOIN OrderDetail od ON o.OrderID = od.OrderID
              JOIN Product p ON od.ProductID = p.ProductID`, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// 📌 **9. ลบ Order (DELETE /orders/:id)**
app.delete("/orders/:id", verifyToken, (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM OrderDetail WHERE OrderID = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        db.query("DELETE FROM `Order` WHERE OrderID = ?", [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Order deleted successfully" });
        });
    });
});

// 📌 **10. เพิ่มสินค้า (POST /customers)**
app.get("/customers", verifyToken, (req, res) => {
    db.query("SELECT * FROM Customer", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.listen(5000, () => {
    console.log('Server running on port http://localhost:5000');
});