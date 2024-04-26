export default function Course() {
  const courses = await getCourses();
  return (
    <div className="flex flex-wrap w-10/12">
    {
        courses.map(course => {
        <Link href="/course/[id]">
          <Card  key={course.id} className="w-[350px]">
          <CardHeader>
            <CardTitle>{course.title}</CardTitle>
          </CardHeader>
          <CardContent>
          {course.summary}
          </CardContent>
          <CardFooter className="flex justify-between">
              <p>{course.teacher}</p>
              <p>{course.availableSlots}</p>
              <p>{course.level}</p>
          </CardFooter>
            </Card> 
          </Link>
    })}
    </div>
  )
}