import CardtableSubject from "../../../components/Cards/CardtableSubject"
import { useState, useEffect } from "react"
import ApiUrl from "../../../utils/ApiUrl"
import { AdminApiRouter } from "../../../utils/admins/AdminApiRoute"

type Props = {}

function SubjectTable({}: Props) {
  const [datas, setDatas] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await ApiUrl.get(AdminApiRouter.subject)
      setDatas(res.data.response)
    }
    fetchData()
  }, [])


  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <CardtableSubject data={datas} />
        </div>
      </div>
    </>
  )
}

export default SubjectTable