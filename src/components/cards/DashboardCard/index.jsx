/* eslint-disable react/prop-types */

export default function DashboardCard({ cardInfo }) {
  return (
    <div className="flex bg-white md:w-[180px] sm:w-[220px] xs:w-[155px] xxl:w-[200px] px-4 py-3 gap-3 items-center rounded-lg shadow-lg">
      <div className="w-[70%]">
        <h1 className="xl:text-2xl lg:text-xl xs:text-lg font-bold">
          {cardInfo.amount}
        </h1>
        <h2 className="text-gray-400 lg:text-sm md:text-[12px] xs:text-[10px]">
          {cardInfo.name}
        </h2>
      </div>
      <div className="w-[25%]">
        <img src={cardInfo.icon} alt="" />
      </div>
    </div>
  );
}
