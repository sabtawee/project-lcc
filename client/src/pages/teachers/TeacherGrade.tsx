import TeacherTable from "./TeacherTable"

type Props = {}

function TeacherGrade({}: Props) {
  return (
    <>
    <div className="flex flex-wrap">
      <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
        <TeacherTable />
      </div>
    </div>
  </>
  )
}

export default TeacherGrade