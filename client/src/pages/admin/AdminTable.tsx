import CardTable from "../../components/Cards/CardTable";

type Props = {};

function AdminTable({}: Props) {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
      </div>
    </>
  );
}

export default AdminTable;
