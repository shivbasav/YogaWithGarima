import { Search, Filter, Download, Mail, Phone, Calendar, User, TrendingUp, Check, X, ClipboardList, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ProtectedRoute } from "../components/ProtectedRoute";

// Mock student data - in production, this would come from Google Forms or backend
const students = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    joinDate: "Jan 15, 2026",
    totalClasses: 24,
    attendedClasses: 22,
    classType: "Online Classes",
    status: "Active",
    lastClass: "Mar 10, 2026",
    notes: "Prefers morning slots, intermediate level",
    attendanceHistory: [
      { date: "Mar 11, 2026", status: "present" },
      { date: "Mar 10, 2026", status: "present" },
      { date: "Mar 8, 2026", status: "present" },
      { date: "Mar 6, 2026", status: "absent" },
      { date: "Mar 4, 2026", status: "present" },
    ],
  },
  {
    id: "2",
    name: "Rahul Mehta",
    email: "rahul.m@email.com",
    phone: "+91 98765 43211",
    joinDate: "Feb 3, 2026",
    totalClasses: 12,
    attendedClasses: 11,
    classType: "Personal Classes",
    status: "Active",
    lastClass: "Mar 9, 2026",
    notes: "Recovering from back injury, needs modifications",
    attendanceHistory: [
      { date: "Mar 9, 2026", status: "present" },
      { date: "Mar 7, 2026", status: "present" },
      { date: "Mar 5, 2026", status: "absent" },
      { date: "Mar 2, 2026", status: "present" },
      { date: "Feb 28, 2026", status: "present" },
    ],
  },
  {
    id: "3",
    name: "Ananya Gupta",
    email: "ananya.gupta@email.com",
    phone: "+91 98765 43212",
    joinDate: "Dec 20, 2025",
    totalClasses: 36,
    attendedClasses: 35,
    classType: "Group Classes",
    status: "Active",
    lastClass: "Mar 11, 2026",
    notes: "Advanced practitioner, interested in workshops",
    attendanceHistory: [
      { date: "Mar 11, 2026", status: "present" },
      { date: "Mar 9, 2026", status: "present" },
      { date: "Mar 7, 2026", status: "present" },
      { date: "Mar 5, 2026", status: "present" },
      { date: "Mar 3, 2026", status: "absent" },
    ],
  },
  {
    id: "4",
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 98765 43213",
    joinDate: "Mar 1, 2026",
    totalClasses: 5,
    attendedClasses: 5,
    classType: "Trial Class",
    status: "Trial",
    lastClass: "Mar 8, 2026",
    notes: "Complete beginner, very enthusiastic",
    attendanceHistory: [
      { date: "Mar 8, 2026", status: "present" },
      { date: "Mar 6, 2026", status: "present" },
      { date: "Mar 4, 2026", status: "present" },
      { date: "Mar 2, 2026", status: "present" },
      { date: "Mar 1, 2026", status: "present" },
    ],
  },
  {
    id: "5",
    name: "Neha Kapoor",
    email: "neha.k@email.com",
    phone: "+91 98765 43214",
    joinDate: "Nov 10, 2025",
    totalClasses: 48,
    attendedClasses: 46,
    classType: "Online Classes",
    status: "Active",
    lastClass: "Mar 11, 2026",
    notes: "Regular student, excellent attendance",
    attendanceHistory: [
      { date: "Mar 11, 2026", status: "present" },
      { date: "Mar 10, 2026", status: "present" },
      { date: "Mar 8, 2026", status: "absent" },
      { date: "Mar 6, 2026", status: "present" },
      { date: "Mar 4, 2026", status: "present" },
    ],
  },
];

const stats = [
  { label: "Total Students", value: "247", icon: <User size={20} />, color: "bg-blue-100 text-blue-700" },
  { label: "Active This Month", value: "182", icon: <TrendingUp size={20} />, color: "bg-green-100 text-green-700" },
  { label: "Trial Students", value: "23", icon: <Calendar size={20} />, color: "bg-orange-100 text-orange-700" },
  { label: "Classes This Week", value: "64", icon: <TrendingUp size={20} />, color: "bg-purple-100 text-purple-700" },
];

export function AdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0] | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "Active" | "Trial">("all");
  const [activeTab, setActiveTab] = useState<"students" | "attendance">("students");
  const [selectedDate, setSelectedDate] = useState<string>("Mar 11, 2026");
  const [attendance, setAttendance] = useState<Record<string, "present" | "absent" | null>>({});

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleAttendanceToggle = (studentId: string, status: "present" | "absent") => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === status ? null : status,
    }));
  };

  const handleSaveAttendance = () => {
    // Here you would save to backend/database
    alert(`Attendance saved for ${selectedDate}`);
    setAttendance({});
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
            Student <span className="italic text-[#5a7a5a]">Dashboard</span>
          </h1>
          <p className="text-sm text-[#2c2c2c]/60">Manage and track student information</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 border border-[#e5ddd4]/50">
              <div className={`inline-flex p-2 rounded-lg ${stat.color} mb-3`}>{stat.icon}</div>
              <p
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-3xl text-[#2c2c2c] mb-1"
              >
                {stat.value}
              </p>
              <p className="text-xs tracking-wider uppercase text-[#2c2c2c]/50">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-[#e5ddd4]/50">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2c2c2c]/40" size={18} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#e5ddd4] bg-[#faf8f5] focus:outline-none focus:border-[#5a7a5a] text-[#2c2c2c] placeholder:text-[#2c2c2c]/30 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-4 py-3 rounded-xl text-xs tracking-widest uppercase transition-all ${
                  filterStatus === "all"
                    ? "bg-[#5a7a5a] text-white"
                    : "bg-[#e5ddd4]/50 text-[#2c2c2c]/60 hover:bg-[#e5ddd4]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("Active")}
                className={`px-4 py-3 rounded-xl text-xs tracking-widest uppercase transition-all ${
                  filterStatus === "Active"
                    ? "bg-[#5a7a5a] text-white"
                    : "bg-[#e5ddd4]/50 text-[#2c2c2c]/60 hover:bg-[#e5ddd4]"
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilterStatus("Trial")}
                className={`px-4 py-3 rounded-xl text-xs tracking-widest uppercase transition-all ${
                  filterStatus === "Trial"
                    ? "bg-[#5a7a5a] text-white"
                    : "bg-[#e5ddd4]/50 text-[#2c2c2c]/60 hover:bg-[#e5ddd4]"
                }`}
              >
                Trial
              </button>
              <button className="px-4 py-3 rounded-xl bg-[#e5ddd4]/50 text-[#2c2c2c]/60 hover:bg-[#e5ddd4] transition-all">
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl overflow-hidden border border-[#e5ddd4]/50">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#e5ddd4]">
                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-[#2c2c2c]/50">
                    Student
                  </th>
                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-[#2c2c2c]/50">
                    Contact
                  </th>
                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-[#2c2c2c]/50">
                    Class Type
                  </th>
                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-[#2c2c2c]/50">
                    Classes
                  </th>
                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-[#2c2c2c]/50">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-[#2c2c2c]/50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b border-[#e5ddd4]/50 hover:bg-[#faf8f5] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="text-[#2c2c2c] font-semibold">{student.name}</p>
                      <p className="text-xs text-[#2c2c2c]/50">Joined {student.joinDate}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-[#2c2c2c]/70 flex items-center gap-2">
                        <Mail size={14} /> {student.email}
                      </p>
                      <p className="text-sm text-[#2c2c2c]/70 flex items-center gap-2 mt-1">
                        <Phone size={14} /> {student.phone}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-[#e8f0e8] text-[#5a7a5a] text-xs rounded-full">
                        {student.classType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-[#2c2c2c] font-semibold">{student.totalClasses}</p>
                      <p className="text-xs text-[#2c2c2c]/50">Last: {student.lastClass}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs rounded-full ${
                          student.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-sm text-[#5a7a5a] hover:underline cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <>
          <div
            className="fixed inset-0 bg-[#2c2c2c]/60 backdrop-blur-sm z-50"
            onClick={() => setSelectedStudent(null)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      className="text-4xl text-[#2c2c2c] mb-2"
                    >
                      {selectedStudent.name}
                    </h3>
                    <span
                      className={`inline-block px-3 py-1 text-xs rounded-full ${
                        selectedStudent.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {selectedStudent.status}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedStudent(null)}
                    className="text-[#2c2c2c]/40 hover:text-[#2c2c2c]"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-[#2c2c2c]/70">
                    <Mail size={18} className="text-[#5a7a5a]" />
                    <span>{selectedStudent.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#2c2c2c]/70">
                    <Phone size={18} className="text-[#5a7a5a]" />
                    <span>{selectedStudent.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[#2c2c2c]/70">
                    <Calendar size={18} className="text-[#5a7a5a]" />
                    <span>Joined {selectedStudent.joinDate}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#e8f0e8] rounded-xl p-4">
                    <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-1">
                      Total Classes
                    </p>
                    <p
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      className="text-3xl text-[#5a7a5a]"
                    >
                      {selectedStudent.totalClasses}
                    </p>
                  </div>
                  <div className="bg-[#e8f0e8] rounded-xl p-4">
                    <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-1">
                      Attendance Rate
                    </p>
                    <p
                      style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      className="text-3xl text-[#5a7a5a]"
                    >
                      {Math.round((selectedStudent.attendedClasses / selectedStudent.totalClasses) * 100)}%
                    </p>
                  </div>
                </div>

                <div className="bg-[#faf8f5] rounded-xl p-4 mb-6">
                  <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-2">
                    Class Type
                  </p>
                  <p className="text-[#2c2c2c]">{selectedStudent.classType}</p>
                </div>

                {/* Attendance History */}
                <div className="bg-white rounded-xl p-4 mb-6 border border-[#e5ddd4]">
                  <div className="flex items-center gap-2 mb-4">
                    <ClipboardList size={18} className="text-[#5a7a5a]" />
                    <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50">
                      Recent Attendance
                    </p>
                  </div>
                  <div className="space-y-2">
                    {selectedStudent.attendanceHistory.map((record, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-[#faf8f5] rounded-lg"
                      >
                        <span className="text-sm text-[#2c2c2c]">{record.date}</span>
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                            record.status === "present"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {record.status === "present" ? (
                            <>
                              <Check size={14} /> Present
                            </>
                          ) : (
                            <>
                              <X size={14} /> Absent
                            </>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#faf8f5] rounded-xl p-4">
                  <p className="text-xs tracking-widest uppercase text-[#2c2c2c]/50 mb-2">Notes</p>
                  <p className="text-[#2c2c2c]/70">{selectedStudent.notes}</p>
                </div>

                <button
                  onClick={() => setSelectedStudent(null)}
                  className="w-full mt-6 py-3 bg-[#5a7a5a] text-white text-sm tracking-widest uppercase rounded-full hover:bg-[#4a6a4a] transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Wrap with authentication
export default function ProtectedAdminPage() {
  return (
    <ProtectedRoute>
      <AdminPage />
    </ProtectedRoute>
  );
}