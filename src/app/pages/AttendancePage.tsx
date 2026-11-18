import { Calendar, Check, X, Save, ChevronLeft, ChevronRight, ClipboardList } from "lucide-react";
import { useState } from "react";
import { ProtectedRoute } from "../components/ProtectedRoute";

// Mock student data
const students = [
  {
    id: "1",
    name: "Priya Sharma",
    classType: "Online Classes",
    status: "Active",
  },
  {
    id: "2",
    name: "Rahul Mehta",
    classType: "Personal Classes",
    status: "Active",
  },
  {
    id: "3",
    name: "Ananya Gupta",
    classType: "Group Classes",
    status: "Active",
  },
  {
    id: "4",
    name: "Vikram Singh",
    classType: "Trial Class",
    status: "Trial",
  },
  {
    id: "5",
    name: "Neha Kapoor",
    classType: "Online Classes",
    status: "Active",
  },
];

const classTypes = ["All Classes", "Online Classes", "Offline Classes", "Personal Classes", "Group Classes", "Trial Class"];

export function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [selectedClassType, setSelectedClassType] = useState<string>("All Classes");
  const [attendance, setAttendance] = useState<Record<string, "present" | "absent" | null>>({});
  const [saved, setSaved] = useState(false);

  const filteredStudents = students.filter(
    (student) => selectedClassType === "All Classes" || student.classType === selectedClassType
  );

  const handleAttendanceToggle = (studentId: string, status: "present" | "absent") => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === status ? null : status,
    }));
    setSaved(false);
  };

  const handleSaveAttendance = () => {
    // Here you would save to backend/database
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const presentCount = Object.values(attendance).filter(v => v === "present").length;
  const absentCount = Object.values(attendance).filter(v => v === "absent").length;
  const unmarkedCount = filteredStudents.length - presentCount - absentCount;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  };

  const changeDate = (days: number) => {
    const currentDate = new Date(selectedDate);
    currentDate.setDate(currentDate.getDate() + days);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  };

  return (
    <div className="pt-20 pb-12 min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <section className="py-12 bg-[#e8f0e8] px-6">
        <div className="max-w-7xl mx-auto">
          <h1
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-5xl text-[#2c2c2c] mb-2"
          >
            Mark <span className="italic text-[#5a7a5a]">Attendance</span>
          </h1>
          <p className="text-sm text-[#2c2c2c]/60">Track student attendance for each class session</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Date Selector */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-[#e5ddd4]/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-2">Class Date</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => changeDate(-1)}
                  className="p-2 rounded-lg hover:bg-[#e5ddd4]/50 transition-colors cursor-pointer"
                >
                  <ChevronLeft size={20} className="text-[#5a7a5a]" />
                </button>
                <div className="flex items-center gap-3">
                  <Calendar size={20} className="text-[#5a7a5a]" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] transition-colors"
                  />
                </div>
                <button
                  onClick={() => changeDate(1)}
                  className="p-2 rounded-lg hover:bg-[#e5ddd4]/50 transition-colors"
                >
                  <ChevronRight size={20} className="text-[#5a7a5a]" />
                </button>
              </div>
              <p className="text-sm text-[#2c2c2c]/60 mt-2">{formatDate(selectedDate)}</p>
            </div>

            <div>
              <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-2">Class Type</p>
              <select
                value={selectedClassType}
                onChange={(e) => setSelectedClassType(e.target.value)}
                className="px-4 py-2 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] transition-colors"
              >
                {classTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 border border-[#e5ddd4]/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-green-100">
                <Check size={20} className="text-green-700" />
              </div>
              <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50">Present</p>
            </div>
            <p
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-4xl text-green-700"
            >
              {presentCount}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#e5ddd4]/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-red-100">
                <X size={20} className="text-red-700" />
              </div>
              <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50">Absent</p>
            </div>
            <p
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-4xl text-red-700"
            >
              {absentCount}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-[#e5ddd4]/50">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-orange-100">
                <ClipboardList size={20} className="text-orange-700" />
              </div>
              <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50">Unmarked</p>
            </div>
            <p
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-4xl text-orange-700"
            >
              {unmarkedCount}
            </p>
          </div>
        </div>

        {/* Attendance List */}
        <div className="bg-white rounded-2xl overflow-hidden border border-[#e5ddd4]/50 mb-6">
          <div className="p-6 border-b border-[#e5ddd4]">
            <h3
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
              className="text-2xl text-[#2c2c2c]"
            >
              Student List ({filteredStudents.length})
            </h3>
          </div>

          <div className="divide-y divide-[#e5ddd4]">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="p-6 hover:bg-[#faf8f5] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-[#2c2c2c] font-semibold mb-1">{student.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-3 py-1 bg-[#e8f0e8] text-[#5a7a5a] text-xs rounded-full">
                        {student.classType}
                      </span>
                      <span
                        className={`inline-block px-3 py-1 text-xs rounded-full ${
                          student.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {student.status}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAttendanceToggle(student.id, "present")}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all ${
                        attendance[student.id] === "present"
                          ? "border-green-500 bg-green-100 text-green-700"
                          : "border-[#e5ddd4] text-[#2c2c2c]/60 hover:border-green-500"
                      }`}
                    >
                      <Check size={18} />
                      <span className="text-sm font-medium">Present</span>
                    </button>

                    <button
                      onClick={() => handleAttendanceToggle(student.id, "absent")}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 transition-all ${
                        attendance[student.id] === "absent"
                          ? "border-red-500 bg-red-100 text-red-700"
                          : "border-[#e5ddd4] text-[#2c2c2c]/60 hover:border-red-500"
                      }`}
                    >
                      <X size={18} />
                      <span className="text-sm font-medium">Absent</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between bg-white rounded-2xl p-6 border border-[#e5ddd4]/50">
          <div>
            <p className="text-sm text-[#2c2c2c] mb-1">
              {unmarkedCount > 0 ? (
                <>
                  <span className="font-semibold">{unmarkedCount}</span> student(s) unmarked
                </>
              ) : (
                <span className="text-green-700 font-semibold">✓ All students marked</span>
              )}
            </p>
            <p className="text-xs text-[#2c2c2c]/50">
              {presentCount} present · {absentCount} absent
            </p>
          </div>

          <button
            onClick={handleSaveAttendance}
            disabled={Object.keys(attendance).length === 0}
            className={`flex items-center gap-2 px-8 py-4 text-white text-sm tracking-widest uppercase rounded-full transition-all ${
              Object.keys(attendance).length > 0
                ? saved
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-[#5a7a5a] hover:bg-[#4a6a4a] hover:shadow-lg"
                : "bg-[#2c2c2c]/20 cursor-not-allowed"
            }`}
          >
            <Save size={18} />
            {saved ? "Saved!" : "Save Attendance"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Wrap with authentication
export default function ProtectedAttendancePage() {
  return (
    <ProtectedRoute>
      <AttendancePage />
    </ProtectedRoute>
  );
}