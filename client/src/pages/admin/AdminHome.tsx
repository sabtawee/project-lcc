import AdminTable from "./AdminTable";

type Props = {};

function AdminHome({}: Props) {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded mt-10">
            <AdminTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
