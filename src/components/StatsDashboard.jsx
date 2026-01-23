import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

/* ================= DATA ================= */

const placementData = [
  { name: "Finance", value: 46 },
  { name: "Tech", value: 23 },
  { name: "HR", value: 23 },
  { name: "Others", value: 8 },
];

const COLORS = ["#006951", "#008450", "#22c55e", "#86efac"];

/* ================= MAIN COMPONENT ================= */

export function StatsDashboard() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="bg-[#006951] text-white py-2 px-6 rounded-t-lg font-bold uppercase text-center mb-8">
        Key Statistical Insights
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* ================= PIE CHART ================= */}
        <div className="bg-white p-6 shadow-md rounded-lg border-t-4 border-[#006951]">
          <h3 className="text-center font-bold text-gray-700 border-b pb-2 mb-4">
            Recruitment Report
          </h3>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={placementData}
                  dataKey="value"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                >
                  {placementData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <p className="text-center font-bold text-[#006951] mt-2">
            PLACEMENTS
          </p>
        </div>

        {/* ================= PLACEMENT STATS ================= */}
        <div className="bg-white p-6 shadow-md rounded-lg border-t-4 border-[#006951] space-y-4">
          <h3 className="text-center font-bold text-gray-700 border-b pb-2">
            Placement Highlights
          </h3>

          <StatItem label="Gross CTC Value" value="3+ CR." isGreen />
          <StatItem label="Highest CTC" value="25 LPA" />
          <StatItem label="Average CTC" value="4.5 LPA" isGreen />
          <StatItem label="Number of Offers" value="120+" />
          <StatItem label="Students Placed" value="70+" isGreen />
        </div>

        {/* ================= INTERNSHIP STATS ================= */}
        <div className="bg-white p-6 shadow-md rounded-lg border-t-4 border-[#006951] space-y-4">
          <h3 className="text-center font-bold text-gray-700 border-b pb-2">
            Internship Highlights
          </h3>

          <StatItem label="Gross Stipend" value="6.2 L+" isGreen />
          <StatItem label="Highest Stipend" value="25 K" />
          <StatItem label="Average Stipend" value="15 K+" isGreen />
          <StatItem label="Number of Offers" value="180+" />
          <StatItem label="Domains" value="15+" isGreen />
        </div>

      </div>
    </section>
  );
}

/* ================= HELPER COMPONENT ================= */

const StatItem = ({ label, value, isGreen }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  // Extract number & suffix (supports 4.5, +, LPA, CR)
  const numericValue = parseFloat(value);
  const suffix = value.replace(/[0-9.]/g, "");

  return (
    <div
      ref={ref}
      className="flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm border-l-4 border-[#006951]"
    >
      <span className="text-sm font-bold text-gray-600 uppercase">
        {label}
      </span>

      <span
        className={`px-4 py-1 rounded-full text-white font-bold text-sm ${
          isGreen ? "bg-[#006951]" : "bg-green-500"
        }`}
      >
        {inView ? (
          <CountUp end={numericValue} duration={2.5} decimals={numericValue % 1 !== 0 ? 1 : 0} />
        ) : (
          0
        )}
        {suffix}
      </span>
    </div>
  );
};
