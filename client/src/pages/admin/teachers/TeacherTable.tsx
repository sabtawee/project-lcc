import CardtableTeacher from "../../../components/Cards/CardtableTeacher"

type Props = {}

function TeacherTable({}: Props) {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardtableTeacher/>
        </div>
      </div>
    </>
  )
}

export default TeacherTable