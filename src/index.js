import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Helper to handle errors uniformly
const handleError = (res, error) => {
  console.error(error);
  res.status(500).send({ success: false, message: "Internal Server Error" });
};

app.post("/user", [
  // Input validation
  body("username").isString().withMessage("Username is required"),
  body("password").isString().withMessage("Password is required"),
], async (req, res) => {
  // Validation check
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ success: false, errors: errors.array() });
  }

  try {
    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const data = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashedPassword,
      },
    });
    res.send({ success: true, data });
  } catch (error) {
    handleError(res, error);
  }
});

app.post("/profile", async (req, res) => {
  try {
    const data = await prisma.profile.create({
      data: {
        email: "pojok@gmail.com",
        name: "Pojok Code",
        address: "jl. flamboyan no 44 Kembangan jakarta Barat",
        phone: "081234567890",
        userId: 1, // This should be dynamic if possible
      },
    });
    res.send({ success: true, data });
  } catch (error) {
    handleError(res, error);
  }
});

app.put("/update", async (req, res) => {
  try {
    const data = await prisma.user.update({
      where: {
        id: 1, // Should be dynamic, potentially coming from req.params or req.body
      },
      data: {
        username: "pcodetest",
        password: "123", // Hash this before saving it!
      },
    });
    res.send({ success: true, data });
  } catch (error) {
    handleError(res, error);
  }
});

app.delete("/delete", async (req, res) => {
  try {
    const data = await prisma.user.delete({
      where: {
        id: 2, // Dynamic ID, ideally coming from req.params
      },
    });
    res.send({ success: true, data });
  } catch (error) {
    handleError(res, error);
  }
});

app.post("/category", async (req, res) => {
  try {
    const data = await prisma.category.create({
      data: {
        name: "Programming",
      },
    });
    res.send({ success: true, data });
  } catch (error) {
    handleError(res, error);
  }
});

app.post("/insert-post", async (req, res) => {
  try {
    const data = await prisma.$transaction(async (prisma) => {
      const post = await prisma.post.create({
        data: {
          title: "Post Title",
          published: true,
          content: "Post Body",
          authorId: 1, // Dynamic authorId could be passed here
        },
      });
      await prisma.categoriesOnPosts.create({
        data: {
          postId: post.id,
          categoryId: 1,
          assignedBy: "admin",
        },
      });
      return post;
    });
    res.send({ success: true, data });
  } catch (error) {
    handleError(res, error);
  }
});

app.get("/get-user", async (req, res) => {
  try {
    const data = await prisma.user.findMany();
    res.send({ success: true, data });
  } catch (error) {
    handleError(res, error);
  }
});

app.get("/get-profile", async (req, res) => {
  try {
    const data = await prisma.$queryRaw`
      SELECT * FROM "Profile" where id=1
    `;
    res.send({ success: true, data });
  } catch (error) {
    handleError(res, error);
  }
});

app.get("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.send({ success: true, data });
  } catch (error) {
    handleError(res, error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
