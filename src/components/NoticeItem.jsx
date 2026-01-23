const NoticeItem = ({ date, month, title }) => (
  <div className="flex gap-4 border-b pb-3 hover:bg-gray-50 p-2">
    <div className="bg-gray-500 text-white min-w-[60px] rounded text-center">
      <div className="text-xl font-bold">{date}</div>
      <div className="text-xs">{month}</div>
    </div>
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <a href="#" className="text-xs text-blue-600">Know More</a>
    </div>
  </div>
);

export default NoticeItem;
