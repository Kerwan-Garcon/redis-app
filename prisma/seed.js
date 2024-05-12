// Prisma Singleton
import prisma from "./singleton";
import { subscriptionClient } from "../src/lib/db";
// Seed function
async function seed() {
  // Create teachers
  const teacher1 = await prisma.teacher.create({
    data: {
      name: "John Doe",
    },
  });

  const teacher2 = await prisma.teacher.create({
    data: {
      name: "Jane Smith",
    },
  });

  // Create students
  const student1 = await prisma.student.create({
    data: {
      name: "Alice",
    },
  });

  const student2 = await prisma.student.create({
    data: {
      name: "Bob",
    },
  });

  // Create courses
  const course1 = await prisma.course.create({
    data: {
      title: "Introduction to Programming",
      teacherId: teacher1.id,
      content: "This course covers the basics of programming.",
      summary: "Learn the fundamentals of programming.",
      level: "Beginner",
      availableSlots: 10,
      expirationDate: new Date("2024-06-30"),
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: "Data Structures and Algorithms",
      teacherId: teacher2.id,
      content: "This course covers advanced data structures and algorithms.",
      summary: "Learn about complex data structures and algorithms.",
      level: "Advanced",
      availableSlots: 15,
      expirationDate: new Date("2024-07-15"),
    },
  });

  // Subscribe students to courses
  await prisma.subscribedCourse.createMany({
    data: [
      {
        studentId: student1.id,
        courseId: course1.id,
      },
      {
        studentId: student2.id,
        courseId: course2.id,
      },
    ],
  });

  await subscriptionClient.sadd(`student:${student1.id}:courses`, course1.id);
  await subscriptionClient.sadd(`student:${student2.id}:courses`, course2.id);
}

// Call seed function
seed()
  .then(() => {
    console.log("Database seeded successfully.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  });
