import React, { useState, useMemo } from 'react';
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  ShieldCheck, 
  Trash2, 
  ChevronRight, 
  Globe, 
  CheckCircle2, 
  Search, 
  UserPlus,
  X,
  Loader2
} from 'lucide-react';
import { useAdminUsers } from '../../hooks/useAdminUsers';
import { API_BASE_URL } from '../../services/api';
import type { UserRole } from '../../types';

export const AdminDashboard: React.FC = () => {
  const [adminTab, setAdminTab] = useState<'users' | 'courses' | 'payments' | 'seo_security'>('users');

  // Hook - barcha admin ma'lumotlarini yuklaydi
  const { users: usersList, payments: paymentsList, loading, createUser, deleteUser } = useAdminUsers();

  const [searchQuery, setSearchQuery] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<UserRole>('student');
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;
    try {
      setIsSubmitting(true);
      await createUser({ name: newUserName, email: newUserEmail, role: newUserRole });
      setNewUserName('');
      setNewUserEmail('');
      setIsAddingUser(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUser(id);
    } catch (err) {
      console.error(err);
    }
  };

  // Qidirish filtri
  const filteredUsers = useMemo(() =>
    usersList.filter(u =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    ), [usersList, searchQuery]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-slate-900 dark:text-white">
      
      {/* SIDEBAR NAVIGATION */}
      <div className="lg:col-span-1 space-y-3">
        <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-4 shadow-2xl space-y-2">
          
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="px-3 py-2 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider border-b border-slate-200/60 dark:border-slate-800/80 mb-3 flex items-center justify-between">
            <span>Admin Control Bar</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <Globe className="w-3 h-3 animate-pulse" /> API Live
            </span>
          </div>

          {[
            { id: 'users', label: 'Foydalanuvchilar', icon: <Users className="w-4 h-4" />, badge: usersList.length, color: 'indigo' },
            { id: 'courses', label: 'Kurslar Modratsiyasi', icon: <BookOpen className="w-4 h-4" />, color: 'emerald' },
            { id: 'payments', label: "To'lovlar", icon: <CreditCard className="w-4 h-4" />, badge: paymentsList.length, color: 'amber' },
            { id: 'seo_security', label: 'SEO & Security', icon: <ShieldCheck className="w-4 h-4" />, color: 'rose' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id as any)}
              className={`w-full p-3.5 rounded-2xl text-xs font-bold text-left flex items-center justify-between transition-all duration-300 relative overflow-hidden active:scale-[0.98] ${
                adminTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <span className="flex items-center gap-3">
                <div className={`p-2 rounded-xl transition-all ${adminTab === tab.id ? 'bg-white/20 text-white' : `bg-${tab.color}-50 dark:bg-slate-800 text-${tab.color}-600 dark:text-${tab.color}-400`}`}>
                  {tab.icon}
                </div>
                {tab.label}
              </span>
              {tab.badge !== undefined ? (
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-extrabold ${adminTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}>
                  {tab.badge}
                </span>
              ) : (
                <ChevronRight className={`w-4 h-4 transition-transform ${adminTab === tab.id ? 'translate-x-0.5 text-white' : 'text-slate-400'}`} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="lg:col-span-3">

        {/* TAB 1: USERS CRUD */}
        {adminTab === 'users' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                  <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-xl">
                    <Users className="w-5 h-5" />
                  </div>
                  Foydalanuvchilar Boshqaruvi
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1">REST API: {API_BASE_URL}/auth/admin/</p>
              </div>

              <button 
                onClick={() => setIsAddingUser(!isAddingUser)}
                className="py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                {isAddingUser ? <X className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                {isAddingUser ? "Yopish" : "Yangi Foydalanuvchi"}
              </button>
            </div>

            {/* Add User Form */}
            {isAddingUser && (
              <form onSubmit={handleAddUser} className="p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Ismi familiyasi"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Elektron pochta"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <div className="flex gap-2">
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs font-semibold cursor-pointer focus:outline-none"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="center_owner">Center Owner</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button type="submit" disabled={isSubmitting} className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 disabled:opacity-50">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Saqlash'}
                  </button>
                </div>
              </form>
            )}

            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Foydalanuvchini ism yoki email bo'yicha qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100/60 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />
            </div>

            {/* Loading */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                <span className="ml-2 text-xs text-slate-500">Foydalanuvchilar yuklanmoqda...</span>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/80 dark:bg-slate-950/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Foydalanuvchi</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Rol</th>
                      <th className="p-4 text-right">Amal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-slate-400">
                          Foydalanuvchi topilmadi
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-bold text-slate-900 dark:text-white">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-indigo-500/20">
                                {u.name.charAt(0).toUpperCase()}
                              </div>
                              <span>{u.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-slate-600 dark:text-slate-300 font-mono text-[11px]">{u.email}</td>
                          <td className="p-4">
                            <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                              u.role === 'admin'
                                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                                : u.role === 'teacher'
                                ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20'
                                : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                            }`}>
                              {u.role.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all"
                              title="O'chirish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PAYMENTS */}
        {adminTab === 'payments' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2.5">
                  <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  Platforma To'lovlari (Payme / Click / Uzum)
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1">REST API: {API_BASE_URL}/payments/</p>
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-amber-500" />
                <span className="ml-2 text-xs text-slate-500">To'lovlar yuklanmoqda...</span>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/80 dark:bg-slate-950/80 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-4">Invoys ID</th>
                      <th className="p-4">Foydalanuvchi</th>
                      <th className="p-4">Xizmat</th>
                      <th className="p-4">Summa</th>
                      <th className="p-4">Holat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {paymentsList.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-slate-400">To'lovlar mavjud emas</td>
                      </tr>
                    ) : (
                      paymentsList.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-mono text-indigo-600 dark:text-indigo-400 font-bold">{p.invoiceId}</td>
                          <td className="p-4 font-bold text-slate-900 dark:text-white">{p.userName}</td>
                          <td className="p-4 text-slate-600 dark:text-slate-300">{p.courseOrSubName}</td>
                          <td className="p-4 font-black text-slate-900 dark:text-white">{p.amount.toLocaleString()} so'm</td>
                          <td className="p-4">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                              <CheckCircle2 className="w-3.5 h-3.5" /> {p.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COURSES MODERATION */}
        {adminTab === 'courses' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
              <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Barcha Kurslar Modratsiyasi</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Platformadagi barcha kurslar ro'yxati va ularni tekshiruvdan o'tkazish paneli.
            </p>
          </div>
        )}

        {/* TAB 4: SEO & SECURITY */}
        {adminTab === 'seo_security' && (
          <div className="relative overflow-hidden rounded-3xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
              <div className="p-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">SEO & Xavfsizlik Paneli</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              CORS, SSL, Rate limiting va Meta taglarni avtomatlashtirish xizmati.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};