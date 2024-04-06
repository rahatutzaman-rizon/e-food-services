import "./index.css";
import image from "./Vector.png";

function Table() {
  const data = [
    {
      tableNo: 1,
      persons: 2,
      food: "Pizza",
      status: "Completed",
    },
    {
      tableNo: 2,
      persons: 4,
      food: "Pasta",
      status: "Pending",
    },

    {
      tableNo: 2,
      persons: 4,
      food: "Pasta",

      status: "Pending",
    },

    {
      tableNo: 2,
      persons: 4,
      food: "Pasta",
      status: "Pending",
    },
    {
      tableNo: 2,
      persons: 4,
      food: "Pasta",
      status: "Pending",
    },
    {
      tableNo: 2,
      persons: 4,
      food: "Pasta",
      status: "Pending",
    },
    // 8 more rows of data
  ];

  return (
    // <div className="flex">
    <div className="">
      <div className="lg:w-[100%] xs:w-[700px] bg-white rounded-lg shadow-lg">
        <div className=" flex justify-between items-center">
          <div>
            <h1 className="font-bold text-xl ml-8 mt-4 ">Food Order</h1>
          </div>

          <div className="flex gap-6 mr-[56px] border-rounded shadow-lg filter mt-6">
            <div>
              <h1 className="font-bold ">Filter Order</h1>
            </div>
            <div>
              <img className="mt-2" src={image} alt="vector image" />
            </div>
          </div>
        </div>

        <table className="w-full text-center mt-8">
          <thead>
            <tr>
              <th>Table No</th>
              <th>No of Persons</th>
              <th>Food Item</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="">
            {data.map((row) => (
              <tr
                className="border-collapse border-l-0 border-r-0 border border-gray-300 h-[80px]"
                key={row.tableNo}
              >
                <td>{row.tableNo}</td>
                <td>{row.persons}</td>
                <td className="mt-1">{row.food}</td>
                <td className="btn  ">
                  <span
                    className={`${
                      row.status === "Completed" ? "btn1" : "btn2"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    // </div>
  );
}

export default Table;