"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, LogOut, RefreshCw, Users, Phone, Briefcase, TrendingUp, Trash2, Edit } from "lucide-react"

type Lead = {
  id: number
  name: string
  phone: string
  carrier: string
  service: string
  created_at: string
  ip_address: string
  user_agent: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<Partial<Lead>>({})
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0,
    byCarrier: {} as Record<string, number>,
    byService: {} as Record<string, number>
  })

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem("admin_authenticated")
    if (auth === "true") {
      setIsAuthenticated(true)
      fetchLeads()
    }
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "kmong_telecom_2025!") {
      setIsAuthenticated(true)
      sessionStorage.setItem("admin_authenticated", "true")
      setError("")
      fetchLeads()
    } else {
      setError("비밀번호가 올바르지 않습니다.")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem("admin_authenticated")
    setLeads([])
  }

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/leads", {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'kmong_telecom_2025!'}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setLeads(data.leads || [])
        calculateStats(data.leads || [])
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (leadsData: Lead[]) => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    const todayLeads = leadsData.filter(lead => 
      new Date(lead.created_at) >= today
    ).length

    const weekLeads = leadsData.filter(lead => 
      new Date(lead.created_at) >= weekAgo
    ).length

    const byCarrier: Record<string, number> = {}
    const byService: Record<string, number> = {}

    leadsData.forEach(lead => {
      byCarrier[lead.carrier] = (byCarrier[lead.carrier] || 0) + 1
      byService[lead.service] = (byService[lead.service] || 0) + 1
    })

    setStats({
      total: leadsData.length,
      today: todayLeads,
      thisWeek: weekLeads,
      byCarrier,
      byService
    })
  }

  const handleDelete = async (id: number) => {
    if (!confirm('정말 삭제하시겠습니까?')) return
    
    try {
      const response = await fetch(`/api/admin/leads?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'kmong_telecom_2025!'}`
        }
      })
      
      if (response.ok) {
        fetchLeads() // Refresh the list
      }
    } catch (error) {
      console.error('Failed to delete lead:', error)
    }
  }

  const handleEdit = (lead: Lead) => {
    setEditingId(lead.id)
    setEditForm({
      name: lead.name,
      phone: lead.phone,
      carrier: lead.carrier,
      service: lead.service
    })
  }

  const handleUpdate = async (id: number) => {
    // For now, just update locally since we don't have a real update API
    setLeads(leads.map(lead => 
      lead.id === id 
        ? { ...lead, ...editForm }
        : lead
    ))
    setEditingId(null)
    setEditForm({})
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditForm({})
  }

  const exportToCSV = () => {
    const headers = ["ID", "이름", "전화번호", "통신사", "서비스", "등록일시"]
    const csvContent = [
      headers.join(","),
      ...leads.map(lead => [
        lead.id,
        lead.name,
        lead.phone,
        lead.carrier,
        lead.service,
        new Date(lead.created_at).toLocaleString("ko-KR")
      ].join(","))
    ].join("\n")

    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `leads_${new Date().toISOString().split('T')[0]}.csv`)
    link.click()
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#6941c6] via-[#5a37b0] to-[#4e2d9a] flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">관리자 로그인</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <Button type="submit" className="w-full bg-[#6941c6] hover:bg-[#5a37b0]">
                로그인
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#6941c6] text-white p-3 sm:p-4">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold">인싸통 관리자 대시보드</h1>
          <div className="flex gap-2 sm:gap-4 w-full sm:w-auto">
            <Button 
              onClick={fetchLeads} 
              variant="outline" 
              className="text-white border-white hover:bg-white hover:text-[#6941c6] text-sm sm:text-base flex-1 sm:flex-none"
            >
              <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">새로고침</span>
              <span className="sm:hidden">새로고침</span>
            </Button>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-[#6941c6] text-sm sm:text-base flex-1 sm:flex-none"
            >
              <LogOut className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">로그아웃</span>
              <span className="sm:hidden">로그아웃</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto p-4 sm:p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">전체 문의</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.total}</p>
                </div>
                <Users className="w-6 h-6 sm:w-8 sm:h-8 text-[#6941c6] mt-2 sm:mt-0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">오늘 문의</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.today}</p>
                </div>
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-500 mt-2 sm:mt-0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">이번주 문의</p>
                  <p className="text-xl sm:text-2xl font-bold">{stats.thisWeek}</p>
                </div>
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mt-2 sm:mt-0" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">평균 일일 문의</p>
                  <p className="text-xl sm:text-2xl font-bold">
                    {stats.total > 0 ? Math.round(stats.thisWeek / 7) : 0}
                  </p>
                </div>
                <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500 mt-2 sm:mt-0" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats by Carrier and Service */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>통신사별 분포</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(stats.byCarrier).map(([carrier, count]) => (
                <div key={carrier} className="flex justify-between items-center mb-2">
                  <span>{carrier}</span>
                  <span className="font-bold">{count}건</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>서비스별 분포</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.entries(stats.byService).map(([service, count]) => (
                <div key={service} className="flex justify-between items-center mb-2">
                  <span>{service}</span>
                  <span className="font-bold">{count}건</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <CardTitle className="text-lg sm:text-xl">문의 목록</CardTitle>
            <Button onClick={exportToCSV} variant="outline" className="text-sm sm:text-base w-full sm:w-auto">
              <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              CSV 다운로드
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">데이터를 불러오는 중...</div>
            ) : leads.length === 0 ? (
              <div className="text-center py-8 text-gray-500">아직 등록된 문의가 없습니다.</div>
            ) : (
              <div className="overflow-x-auto -mx-2 sm:mx-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs sm:text-sm">ID</TableHead>
                      <TableHead className="text-xs sm:text-sm">이름</TableHead>
                      <TableHead className="text-xs sm:text-sm">전화번호</TableHead>
                      <TableHead className="text-xs sm:text-sm hidden sm:table-cell">통신사</TableHead>
                      <TableHead className="text-xs sm:text-sm hidden md:table-cell">서비스</TableHead>
                      <TableHead className="text-xs sm:text-sm">등록일시</TableHead>
                      <TableHead className="text-xs sm:text-sm text-center">관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell className="text-xs sm:text-sm">{lead.id}</TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {editingId === lead.id ? (
                            <Input
                              value={editForm.name || ''}
                              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                              className="h-8 text-xs sm:text-sm"
                            />
                          ) : (
                            lead.name
                          )}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {editingId === lead.id ? (
                            <Input
                              value={editForm.phone || ''}
                              onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                              className="h-8 text-xs sm:text-sm"
                            />
                          ) : (
                            lead.phone
                          )}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm hidden sm:table-cell">
                          {editingId === lead.id ? (
                            <select
                              value={editForm.carrier || ''}
                              onChange={(e) => setEditForm({ ...editForm, carrier: e.target.value })}
                              className="h-8 text-xs sm:text-sm border rounded px-2 w-full"
                            >
                              <option value="KT">KT</option>
                              <option value="SKT">SKT</option>
                              <option value="LG U+">LG U+</option>
                              <option value="알뜰폰">알뜰폰</option>
                            </select>
                          ) : (
                            lead.carrier
                          )}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm hidden md:table-cell">
                          {editingId === lead.id ? (
                            <select
                              value={editForm.service || ''}
                              onChange={(e) => setEditForm({ ...editForm, service: e.target.value })}
                              className="h-8 text-xs sm:text-sm border rounded px-2 w-full"
                            >
                              <option value="인터넷">인터넷</option>
                              <option value="인터넷+TV">인터넷+TV</option>
                              <option value="인터넷+TV+전화">인터넷+TV+전화</option>
                            </select>
                          ) : (
                            lead.service
                          )}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          {new Date(lead.created_at).toLocaleString("ko-KR", {
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">
                          <div className="flex gap-1 justify-center">
                            {editingId === lead.id ? (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUpdate(lead.id)}
                                  className="h-7 px-2"
                                >
                                  저장
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={handleCancel}
                                  className="h-7 px-2"
                                >
                                  취소
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEdit(lead)}
                                  className="h-7 w-7 p-0"
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDelete(lead.id)}
                                  className="h-7 w-7 p-0 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}