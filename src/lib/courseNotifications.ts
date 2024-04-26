import { pub, sub } from "./db";
const courseNotificationChannel = "course-updates";

async function subscribeStudentToCourseNotifications(
  studentId: number,
  courseId: number
) {
  const studentSubscriptionChannel = `${courseNotificationChannel}:${courseId}`;
  await sub.subscribe(studentSubscriptionChannel);
}

async function publishCourseNotification(
  courseId: number,
  notificationTitle: string,
  notificationContent: string
) {
  const courseNotification = `${courseNotificationChannel}:${courseId}`;
  await pub.publish(
    courseNotification,
    JSON.stringify({
      title: notificationTitle,
      content: notificationContent,
      courseId: courseId,
    })
  );
}

async function unsubscribeStudentFromCourseNotifications(
  studentId: number,
  courseId: number
) {
  const studentSubscriptionChannel = `${courseNotificationChannel}:${courseId}`;
  await sub.unsubscribe(studentSubscriptionChannel);
}

sub.on("message", (channel, message) => {
  if (channel.startsWith(`course-updates:`)) {
    const courseId = channel.slice(`course-updates:`.length);
    const notificationData = JSON.parse(message);
    // Process the notification for the given courseId (e.g., publish to a message queue or send to other clients)
  }
});

export {
  subscribeStudentToCourseNotifications,
  publishCourseNotification,
  unsubscribeStudentFromCourseNotifications,
};
