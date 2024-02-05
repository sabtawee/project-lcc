import CardtableStudent from "../../../components/Cards/CardtableStudent"

type Props = {}

function StudentTable({}: Props) {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardtableStudent />
        </div>
      </div>
    </>
  )
}

export default StudentTable