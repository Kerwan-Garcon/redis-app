import { expireCourses, refreshCourseExpiration } from "@/actions/courses";
import { pub, sub } from "./db";
import { getSubscribedCourses } from "@/actions/subscribes";
const courseNotificationChannel = "course-updates";

async function subscribeStudentToCourseNotifications(
  studentId: number,
  courseId: number
) {
  try {
    const studentSubscriptionChannel = `${courseNotificationChannel}:${courseId}`;
    await sub.subscribe(studentSubscriptionChannel);

    const subscribedCourses = await getSubscribedCourses(studentId);
    const subscribedCourseIds = subscribedCourses.map((course) => course.id);
    if (subscribedCourseIds.includes(courseId)) {
      await refreshCourseExpiration(courseId);
    }
  } catch (error) {
    console.error("Error subscribing to course notifications:", error);
    throw error;
  }
}

async function publishCourseNotification(
  courseId: number,
  notificationTitle: string,
  notificationContent: string
) {
  try {
    const courseNotification = `${courseNotificationChannel}:${courseId}`;
    await pub.publish(
      courseNotification,
      JSON.stringify({
        title: notificationTitle,
        content: notificationContent,
        courseId: courseId,
      })
    );
  } catch (error) {
    console.error("Error publishing course notification:", error);
    throw error;
  }
}

async function unsubscribeStudentFromCourseNotifications(
  studentId: number,
  courseId: number
) {
  try {
    const studentSubscriptionChannel = `${courseNotificationChannel}:${courseId}`;
    await sub.unsubscribe(studentSubscriptionChannel);
  } catch (error) {
    console.error("Error unsubscribing from course notifications:", error);
    throw error;
  }
}

sub.on("message", async (channel, message) => {
  if (channel.startsWith(`course-updates:`)) {
    const courseId = channel.slice(`course-updates:`.length);
    const notificationData = JSON.parse(message);
    await expireCourses();
    // Process the notification for the given courseId (e.g., publish to a message queue or send to other clients)
    // For now, we'll just log the notification ( need websocket implementation to send to client )
    console.log(
      `Course ${courseId} has a new notification: ${notificationData.title}`
    );
  }
});

export {
  subscribeStudentToCourseNotifications,
  publishCourseNotification,
  unsubscribeStudentFromCourseNotifications,
};
