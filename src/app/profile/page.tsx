export default function Profile() {
  const mescours = await getMescours();
  return (
    <div className="h-screen w-full flex ">
      <div className="w-10/12">
        <h1>MES COURS</h1>
        <Separator className="w-full" />
        {mescours.map(course => {
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
        })}
      </div>
    </div>
  )
}