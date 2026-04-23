"use client"

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import toast from "react-hot-toast"

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_KEY || "93fb3524249e8f39be550a4b8804904e"

type WithId<T> = T & { id?: string; order?: number; createdAt?: string }

type TeamMember = WithId<{
  name: string
  position: string
  linkedinLink?: string
  image: string
  _imageFile?: File | null
}>

type FaqItem = WithId<{
  faq_que: string
  faq_ans: string
}>

type EventItem = WithId<{
  title: string
  excerpt: string
  content: string
  author: string
  tags: string | string[]
  image: string
  _imageFile?: File | null
}>

type CareerItem = WithId<{
  image?: string
  title: string
  department?: string
  location?: string
  employmentType?: string
  summary: string
  applyLink?: string
  tags?: string
  _imageFile?: File | null
}>

type TabId = "team" | "faq" | "events" | "careers"

const TABS: Array<{ id: TabId; label: string; icon: string }> = [
  { id: "team", label: "Team", icon: "mdi:account-group" },
  { id: "faq", label: "FAQ", icon: "mdi:help-circle" },
  { id: "events", label: "Blogs", icon: "mdi:post" },
  { id: "careers", label: "Careers", icon: "mdi:briefcase" },
]

async function uploadToImgbb(file?: File | null) {
  if (!file) return undefined
  const formData = new FormData()
  formData.append("image", file)

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: "POST",
    body: formData,
  })

  const payload = await response.json()
  if (!response.ok || !payload?.data?.url) {
    throw new Error("Image upload failed")
  }

  return payload.data.url as string
}

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState<TabId>("team")

  const [team, setTeam] = useState<TeamMember[]>([])
  const [faqs, setFaqs] = useState<FaqItem[]>([])
  const [events, setEvents] = useState<EventItem[]>([])
  const [careers, setCareers] = useState<CareerItem[]>([])

  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [newTeam, setNewTeam] = useState<Partial<TeamMember>>({})
  const [newFaq, setNewFaq] = useState<Partial<FaqItem>>({})
  const [newEvent, setNewEvent] = useState<Partial<EventItem>>({})
  const [newCareer, setNewCareer] = useState<Partial<CareerItem>>({})

  const [teamImageKey, setTeamImageKey] = useState(Date.now())
  const [eventImageKey, setEventImageKey] = useState(Date.now())
  const [careerImageKey, setCareerImageKey] = useState(Date.now())

  const [showEditTeam, setShowEditTeam] = useState(false)
  const [editTeam, setEditTeam] = useState<TeamMember | null>(null)

  const [showEditFaq, setShowEditFaq] = useState(false)
  const [editFaq, setEditFaq] = useState<FaqItem | null>(null)

  const [showEditEvent, setShowEditEvent] = useState(false)
  const [editEvent, setEditEvent] = useState<EventItem | null>(null)

  const [showEditCareer, setShowEditCareer] = useState(false)
  const [editCareer, setEditCareer] = useState<CareerItem | null>(null)

  const teamFormRef = useRef<HTMLDivElement | null>(null)
  const faqFormRef = useRef<HTMLDivElement | null>(null)
  const eventFormRef = useRef<HTMLDivElement | null>(null)
  const careerFormRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    void loadAll()
  }, [])

  const stats = useMemo(
    () => [
      { label: "Team", value: team.length, icon: "mdi:account-group", color: "text-purple_blue", bg: "bg-purple_blue/10" },
      { label: "FAQs", value: faqs.length, icon: "mdi:help-circle", color: "text-blue-500", bg: "bg-blue-500/10" },
      { label: "Blogs", value: events.length, icon: "mdi:post", color: "text-orange-500", bg: "bg-orange-500/10" },
      { label: "Careers", value: careers.length, icon: "mdi:briefcase", color: "text-cyan-500", bg: "bg-cyan-500/10" },
    ],
    [team.length, faqs.length, events.length, careers.length],
  )

  const loadAll = async () => {
    try {
      setLoading(true)
      const [teamRes, faqRes, eventRes, careerRes] = await Promise.all([
        fetch("/api/team"),
        fetch("/api/faq"),
        fetch("/api/blogs"),
        fetch("/api/careers"),
      ])

      if (!teamRes.ok || !faqRes.ok || !eventRes.ok || !careerRes.ok) {
        throw new Error("Failed to fetch data")
      }

      const [teamJson, faqJson, eventJson, careerJson] = await Promise.all([
        teamRes.json(),
        faqRes.json(),
        eventRes.json(),
        careerRes.json(),
      ])

      setTeam(teamJson || [])
      setFaqs(faqJson || [])
      setEvents(eventJson || [])
      setCareers(careerJson || [])
    } catch (error) {
      console.error(error)
      toast.error("Unable to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const saveOrder = async (endpoint: string, ordered: Array<{ id?: string }>) => {
    const payload = ordered
      .map((item, index) => (item.id ? { id: item.id, order: index } : null))
      .filter((item): item is { id: string; order: number } => Boolean(item))

    if (payload.length === 0) return

    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order: payload }),
      })
    } catch (error) {
      console.error("Failed to save order", error)
      toast.error("Unable to persist order")
    }
  }

  const reorderList = <T,>(items: T[], index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= items.length) return items
    const copy = [...items]
    ;[copy[index], copy[targetIndex]] = [copy[targetIndex], copy[index]]
    return copy
  }

  const handleReorder = <T extends { id?: string }>(
    list: T[],
    setter: (value: T[]) => void,
    endpoint: string,
    index: number,
    direction: "up" | "down",
  ) => {
    const next = reorderList(list, index, direction)
    if (next !== list) {
      setter(next)
      void saveOrder(endpoint, next)
    }
  }

  const createTeamMember = async () => {
    if (!newTeam.name?.trim() || !newTeam.position?.trim() || !newTeam._imageFile) {
      toast.error("Name, position, and photo are required")
      return
    }

    setSaving(true)
    try {
      const image = await uploadToImgbb(newTeam._imageFile)
      const response = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newTeam.name,
          position: newTeam.position,
          linkedinLink: newTeam.linkedinLink,
          image,
        }),
      })

      if (!response.ok) throw new Error("Create failed")
      toast.success("Team member added")
      setNewTeam({})
      setTeamImageKey(Date.now())
      await loadAll()
    } catch (error) {
      console.error(error)
      toast.error("Unable to add team member")
    } finally {
      setSaving(false)
    }
  }

  const updateTeamMember = async (member: TeamMember) => {
    if (!member.id) return
    setSaving(true)
    try {
      let image = member.image
      if (member._imageFile) {
        image = (await uploadToImgbb(member._imageFile)) || image
      }

      const response = await fetch(`/api/team/${member.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: member.name,
          position: member.position,
          linkedinLink: member.linkedinLink,
          image,
        }),
      })

      if (!response.ok) throw new Error("Update failed")
      toast.success("Team member updated")
      await loadAll()
    } catch (error) {
      console.error(error)
      toast.error("Unable to update team member")
    } finally {
      setSaving(false)
    }
  }

  const deleteTeamMember = async (id?: string) => {
    if (!id) return
    setSaving(true)
    try {
      const response = await fetch(`/api/team/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Delete failed")
      toast.success("Team member removed")
      await loadAll()
    } catch (error) {
      console.error(error)
      toast.error("Unable to delete team member")
    } finally {
      setSaving(false)
    }
  }

  const createFaqItem = async () => {
    if (!newFaq.faq_que?.trim() || !newFaq.faq_ans?.trim()) {
      toast.error("Question and answer are required")
      return
    }
    setSaving(true)
    try {
      const response = await fetch("/api/faq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faq_que: newFaq.faq_que, faq_ans: newFaq.faq_ans }),
      })
      if (!response.ok) throw new Error("Create failed")
      toast.success("FAQ added")
      setNewFaq({})
      await loadAll()
    } catch (error) {
      console.error(error)
      toast.error("Unable to add FAQ")
    } finally {
      setSaving(false)
    }
  }

  const updateFaqItem = async (item: FaqItem) => {
    if (!item.id) return
    setSaving(true)
    try {
      const response = await fetch(`/api/faq/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ faq_que: item.faq_que, faq_ans: item.faq_ans }),
      })
      if (!response.ok) throw new Error("Update failed")
      toast.success("FAQ updated")
      await loadAll()
    } catch (error) {
      console.error(error)
      toast.error("Unable to update FAQ")
    } finally {
      setSaving(false)
    }
  }

  const deleteFaqItem = async (id?: string) => {
    if (!id) return
    setSaving(true)
    try {
      const response = await fetch(`/api/faq/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Delete failed")
      toast.success("FAQ removed")
      await loadAll()
    } catch (error) {
      console.error(error)
      toast.error("Unable to delete FAQ")
    } finally {
      setSaving(false)
    }
  }

  const createEventItem = async () => {
    if (!newEvent.title?.trim() || !newEvent.content?.trim()) {
      toast.error("Title and content are required")
      return
    }

    setSaving(true)
    try {
      let image = ''
      if (newEvent._imageFile) {
        image = await uploadToImgbb(newEvent._imageFile) || ''
      }
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newEvent.title,
          excerpt: newEvent.excerpt || '',
          content: newEvent.content,
          author: newEvent.author || 'HABB Team',
          tags:
            typeof newEvent.tags === "string"
              ? newEvent.tags.split(",").map((t) => t.trim()).filter(Boolean)
              : newEvent.tags || [],
          image,
        }),
      })

      if (!response.ok) throw new Error("Create failed")
      toast.success("Blog posted")
      setNewEvent({})
      setEventImageKey(Date.now())
      await loadAll()
    } catch (error) {
      console.error(error)
      toast.error("Unable to post blog")
    } finally {
      setSaving(false)
    }
  }

  const updateEventItem = async (item: EventItem) => {
    if (!item.id) return
    setSaving(true)
    try {
      let image = item.image
      if (item._imageFile) {
        image = (await uploadToImgbb(item._imageFile)) || image
      }

      const response = await fetch(`/api/blogs/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: item.title,
          excerpt: item.excerpt || '',
          content: item.content,
          author: item.author || 'HABB Team',
          tags:
            typeof item.tags === "string"
              ? item.tags.split(",").map((t) => t.trim()).filter(Boolean)
              : item.tags || [],
          image,
        }),
      })

      if (!response.ok) throw new Error("Update failed")
      toast.success("Blog updated")
      await loadAll()
    } catch (error) {
      console.error(error)
      toast.error("Unable to update blog")
    } finally {
      setSaving(false)
    }
  }

  const deleteEventItem = async (id?: string) => {
    if (!id) return
    setSaving(true)
    try {
      const response = await fetch(`/api/blogs/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Delete failed")
      toast.success("Blog removed")
      await loadAll()
    } catch (error) {
      console.error(error)
      toast.error("Unable to delete blog")
    } finally {
      setSaving(false)
    }
  }

  const createCareerItem = async () => {
    if (!newCareer.title?.trim() || !newCareer.summary?.trim() || !newCareer.applyLink?.trim()) {
      toast.error("Title, summary, and apply link are required")
      return
    }

    setSaving(true)
    try {
      let image: string | undefined
      if (newCareer._imageFile) {
        image = await uploadToImgbb(newCareer._imageFile)
      }

      const response = await fetch("/api/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newCareer.title,
          summary: newCareer.summary,
          applyLink: newCareer.applyLink,
          department: newCareer.department,
          location: newCareer.location,
          employmentType: newCareer.employmentType,
          tags: newCareer.tags,
          image,
        }),
      })

      if (!response.ok) throw new Error("Create failed")
      toast.success("Job added")
      setNewCareer({})
      setCareerImageKey(Date.now())
      await loadAll()
    } catch (error) {
      console.error(error)
      toast.error("Unable to add job")
    } finally {
      setSaving(false)
    }
  }

  const updateCareerItem = async (item: CareerItem) => {
    if (!item.id) return
    setSaving(true)
    try {
      let image = item.image
      if (item._imageFile) {
        image = (await uploadToImgbb(item._imageFile)) || image
      }

      const response = await fetch(`/api/careers/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: item.title,
          summary: item.summary,
          applyLink: item.applyLink,
          department: item.department,
          location: item.location,
          employmentType: item.employmentType,
          tags: item.tags,
          image,
        }),
      })

      if (!response.ok) throw new Error("Update failed")
      toast.success("Job updated")
      await loadAll()
    } catch (error) {
      console.error(error)
      toast.error("Unable to update job")
    } finally {
      setSaving(false)
    }
  }

  const deleteCareerItem = async (id?: string) => {
    if (!id) return
    setSaving(true)
    try {
      const response = await fetch(`/api/careers/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Delete failed")
      toast.success("Job removed")
      await loadAll()
    } catch (error) {
      console.error(error)
      toast.error("Unable to delete job")
    } finally {
      setSaving(false)
    }
  }

  const scrollToForm = (ref: RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const resetTeamForm = () => {
    setNewTeam({})
    setTeamImageKey(Date.now())
  }

  const resetEventForm = () => {
    setNewEvent({})
    setEventImageKey(Date.now())
  }

  const resetCareerForm = () => {
    setNewCareer({})
    setCareerImageKey(Date.now())
  }

  const renderModal = ({
    open,
    title,
    subtitle,
    onClose,
    children,
  }: {
    open: boolean
    title: string
    subtitle?: string
    onClose: () => void
    children: ReactNode
  }) => {
    if (!open) return null
    return (
      <div className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div
          onClick={(event) => event.stopPropagation()}
          className="relative z-10 w-full max-w-2xl rounded-2xl bg-white dark:bg-dark_black border border-white/10 shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-200 dark:border-white/10 sticky top-0 bg-white dark:bg-dark_black">
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition"
              aria-label="Close"
            >
              <Icon icon="mdi:close" width={20} />
            </button>
          </div>
          <div className="p-6 space-y-6">{children}</div>
        </div>
      </div>
    )
  }

  const renderTeamSection = () => (
    <section className="bg-white dark:bg-dark_black rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
          <Icon icon="mdi:account-group" width={28} className="text-purple_blue" />
          Team Members
        </h2>
        <button
          onClick={() => scrollToForm(teamFormRef)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple_blue text-white font-semibold shadow-lg hover:shadow-xl hover:bg-purple-800 transition-all"
        >
          <Icon icon="mdi:plus-circle" width={20} />
          Add Member
        </button>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-4">Manage Team ({team.length})</h3>
        {team.length === 0 && (
          <p className="text-sm text-gray-500 mb-6">No team members yet. Use the form below to add your first member.</p>
        )}
        <div className="grid md:grid-cols-2 gap-4">
          {team.map((member, index) => (
            <div
              key={member.id ?? `${member.name}-${index}`}
              className="relative rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-dark_black/40 p-5 shadow-sm hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4">
                <img
                  src={member._imageFile ? URL.createObjectURL(member._imageFile) : member.image}
                  alt={member.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-purple_blue"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <p className="font-semibold truncate">{member.name}</p>
                  <p className="text-sm text-gray-600 truncate">{member.position}</p>
                  {member.linkedinLink && (
                    <a
                      href={member.linkedinLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600"
                    >
                      <Icon icon="mdi:link-variant" width={14} />
                      LinkedIn
                    </a>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleReorder(team, setTeam, "/api/team/reorder", index, "up")}
                    disabled={index === 0}
                    className="p-1.5 rounded bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Move up"
                  >
                    <Icon icon="mdi:arrow-up" width={16} />
                  </button>
                  <button
                    onClick={() => handleReorder(team, setTeam, "/api/team/reorder", index, "down")}
                    disabled={index === team.length - 1}
                    className="p-1.5 rounded bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Move down"
                  >
                    <Icon icon="mdi:arrow-down" width={16} />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setEditTeam({ ...member, _imageFile: null })
                      setShowEditTeam(true)
                    }}
                    className="px-3 py-1.5 rounded-lg bg-yellow-500 text-white text-sm font-medium hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTeamMember(member.id)}
                    className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={teamFormRef} className="mt-10 pt-8 border-t border-gray-200 dark:border-white/10">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Icon icon="mdi:plus-circle" width={24} className="text-purple_blue" />
          Add New Team Member
        </h3>
        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault()
            void createTeamMember()
          }}
        >
          <div>
            <label htmlFor="team-name" className="block text-sm font-medium mb-1.5">
              Name*
            </label>
            <input
              id="team-name"
              value={newTeam.name || ""}
              onChange={(event) => setNewTeam((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="team-position" className="block text-sm font-medium mb-1.5">
              Position*
            </label>
            <input
              id="team-position"
              value={newTeam.position || ""}
              onChange={(event) => setNewTeam((prev) => ({ ...prev, position: event.target.value }))}
              placeholder="CEO"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="team-linkedin" className="block text-sm font-medium mb-1.5">
              LinkedIn
            </label>
            <input
              id="team-linkedin"
              value={newTeam.linkedinLink || ""}
              onChange={(event) => setNewTeam((prev) => ({ ...prev, linkedinLink: event.target.value }))}
              placeholder="https://linkedin.com/in/..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="team-photo" className="block text-sm font-medium mb-1.5">
              Photo*
            </label>
            <input
              id="team-photo"
              key={`team-photo-${teamImageKey}`}
              type="file"
              accept="image/*"
              onChange={(event) =>
                setNewTeam((prev) => ({ ...prev, _imageFile: event.target.files?.[0] || null }))
              }
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
            />
          </div>
          {newTeam._imageFile && (
            <div className="md:col-span-2 flex justify-center">
              <img
                src={URL.createObjectURL(newTeam._imageFile)}
                alt="Preview"
                className="w-28 h-28 object-cover rounded-full border-4 border-purple_blue shadow-lg"
              />
            </div>
          )}
          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={resetTeamForm}
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-purple_blue text-white font-semibold shadow hover:bg-purple-800 transition"
            >
              Save Member
            </button>
          </div>
        </form>
      </div>
    </section>
  )

  const renderFaqSection = () => (
    <section className="bg-white dark:bg-dark_black rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
          <Icon icon="mdi:help-circle" width={28} className="text-purple_blue" />
          FAQs
        </h2>
        <button
          onClick={() => scrollToForm(faqFormRef)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple_blue text-white font-semibold shadow-lg hover:shadow-xl hover:bg-purple-800 transition-all"
        >
          <Icon icon="mdi:plus-circle" width={20} />
          Add FAQ
        </button>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-4">Manage FAQs ({faqs.length})</h3>
        {faqs.length === 0 && (
          <p className="text-sm text-gray-500 mb-6">Add a FAQ below to help visitors.</p>
        )}
        <div className="grid gap-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id ?? `${faq.faq_que}-${index}`}
              className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-dark_black/40 p-5 shadow-sm hover:shadow-lg transition"
            >
              <p className="font-semibold mb-2">{faq.faq_que}</p>
              <p className="text-sm text-gray-600 mb-4">{faq.faq_ans}</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleReorder(faqs, setFaqs, "/api/faq/reorder", index, "up")}
                  disabled={index === 0}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium"
                  aria-label="Move up"
                >
                  <Icon icon="mdi:arrow-up" width={16} />
                </button>
                <button
                  onClick={() => handleReorder(faqs, setFaqs, "/api/faq/reorder", index, "down")}
                  disabled={index === faqs.length - 1}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed text-sm font-medium"
                  aria-label="Move down"
                >
                  <Icon icon="mdi:arrow-down" width={16} />
                </button>
                <button
                  onClick={() => {
                    setEditFaq({ ...faq })
                    setShowEditFaq(true)
                  }}
                  className="px-3 py-1.5 rounded-lg bg-yellow-500 text-white text-sm font-medium hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteFaqItem(faq.id)}
                  className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={faqFormRef} className="mt-10 pt-8 border-t border-gray-200 dark:border-white/10">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Icon icon="mdi:plus-circle" width={24} className="text-purple_blue" />
          Add New FAQ
        </h3>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            void createFaqItem()
          }}
        >
          <div>
            <label htmlFor="faq-question" className="block text-sm font-medium mb-1.5">
              Question*
            </label>
            <input
              id="faq-question"
              value={newFaq.faq_que || ""}
              onChange={(event) => setNewFaq((prev) => ({ ...prev, faq_que: event.target.value }))}
              placeholder="What services do you offer?"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="faq-answer" className="block text-sm font-medium mb-1.5">
              Answer*
            </label>
            <textarea
              id="faq-answer"
              value={newFaq.faq_ans || ""}
              onChange={(event) => setNewFaq((prev) => ({ ...prev, faq_ans: event.target.value }))}
              placeholder="We help with..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition min-h-32"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setNewFaq({})}
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-purple_blue text-white font-semibold shadow hover:bg-purple-800 transition"
            >
              Save FAQ
            </button>
          </div>
        </form>
      </div>
    </section>
  )

  const renderEventsSection = () => (
    <section className="bg-white dark:bg-dark_black rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
          <Icon icon="mdi:post" width={28} className="text-purple_blue" />
          Blog Posts
        </h2>
        <button
          onClick={() => scrollToForm(eventFormRef)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple_blue text-white font-semibold shadow-lg hover:shadow-xl hover:bg-purple-800 transition-all"
        >
          <Icon icon="mdi:plus-circle" width={20} />
          New Blog Post
        </button>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-4">Published Blogs ({events.length})</h3>
        {events.length === 0 && (
          <p className="text-sm text-gray-500 mb-6">Write your first blog post using the form below.</p>
        )}
        <div className="grid md:grid-cols-2 gap-4">
          {events.map((item, index) => (
            <div
              key={item.id ?? `${item.title}-${index}`}
              className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-dark_black/40 p-5 shadow-sm hover:shadow-lg transition"
            >
              {item.image && (
                <img
                  src={item._imageFile ? URL.createObjectURL(item._imageFile) : item.image}
                  alt={item.title}
                  className="w-full h-36 object-cover rounded-lg border-2 border-purple_blue mb-4"
                />
              )}
              <p className="font-semibold mb-1 truncate">{item.title}</p>
              <p className="text-xs text-gray-500 mb-2">By {item.author || 'HABB Team'}</p>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.excerpt || item.content?.substring(0, 100)}</p>
              {item.tags && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {(typeof item.tags === 'string' ? item.tags.split(',') : item.tags).map((tag: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 bg-purple_blue/10 text-purple_blue text-xs rounded-full">{tag.trim()}</span>
                  ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleReorder(events, setEvents, "/api/blogs/reorder", index, "up")}
                  disabled={index === 0}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Move up"
                >
                  <Icon icon="mdi:arrow-up" width={16} />
                </button>
                <button
                  onClick={() => handleReorder(events, setEvents, "/api/blogs/reorder", index, "down")}
                  disabled={index === events.length - 1}
                  className="p-2 rounded-lg bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label="Move down"
                >
                  <Icon icon="mdi:arrow-down" width={16} />
                </button>
                <button
                  onClick={() => {
                    setEditEvent({ ...item, _imageFile: null })
                    setShowEditEvent(true)
                  }}
                  className="px-3 py-1.5 rounded-lg bg-yellow-500 text-white text-sm font-medium hover:bg-yellow-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEventItem(item.id)}
                  className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={eventFormRef} className="mt-10 pt-8 border-t border-gray-200 dark:border-white/10">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Icon icon="mdi:plus-circle" width={24} className="text-purple_blue" />
          Write New Blog Post
        </h3>
        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault()
            void createEventItem()
          }}
        >
          <div>
            <label htmlFor="event-title" className="block text-sm font-medium mb-1.5">
              Title*
            </label>
            <input
              id="event-title"
              value={newEvent.title || ""}
              onChange={(event) => setNewEvent((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Blog post title"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="event-excerpt" className="block text-sm font-medium mb-1.5">
              Excerpt (Optional)
            </label>
            <textarea
              id="event-excerpt"
              value={newEvent.excerpt || ""}
              onChange={(event) => setNewEvent((prev) => ({ ...prev, excerpt: event.target.value }))}
              placeholder="Brief summary of the post"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
              rows={2}
            />
          </div>
          <div>
            <label htmlFor="event-content" className="block text-sm font-medium mb-1.5">
              Content*
            </label>
            <textarea
              id="event-content"
              value={newEvent.content || ""}
              onChange={(event) => setNewEvent((prev) => ({ ...prev, content: event.target.value }))}
              placeholder="Write your blog post content here..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition min-h-48"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="event-author" className="block text-sm font-medium mb-1.5">
                Author
              </label>
              <input
                id="event-author"
                value={newEvent.author || ""}
                onChange={(event) => setNewEvent((prev) => ({ ...prev, author: event.target.value }))}
                placeholder="HABB Team"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="event-tags" className="block text-sm font-medium mb-1.5">
                Tags (comma-separated)
              </label>
              <input
                id="event-tags"
                value={newEvent.tags || ""}
                onChange={(event) => setNewEvent((prev) => ({ ...prev, tags: event.target.value }))}
                placeholder="technology, startup, design"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
              />
            </div>
          </div>
          <div>
            <label htmlFor="event-image" className="block text-sm font-medium mb-1.5">
              Featured Image (Optional)
            </label>
            <input
              id="event-image"
              key={`event-image-${eventImageKey}`}
              type="file"
              accept="image/*"
              onChange={(event) =>
                setNewEvent((prev) => ({ ...prev, _imageFile: event.target.files?.[0] || null }))
              }
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
            />
          </div>
          {newEvent._imageFile && (
            <div className="flex justify-center">
              <img
                src={URL.createObjectURL(newEvent._imageFile)}
                alt="Preview"
                className="w-full max-w-md h-48 object-cover rounded-xl border-4 border-purple_blue shadow-lg"
              />
            </div>
          )}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={resetEventForm}
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-purple_blue text-white font-semibold shadow hover:bg-purple-800 transition"
            >
              Publish Blog
            </button>
          </div>
        </form>
      </div>
    </section>
  )

  const renderCareersSection = () => (
    <section className="bg-white dark:bg-dark_black rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-white/10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
          <Icon icon="mdi:briefcase" width={28} className="text-purple_blue" />
          Career Opportunities
        </h2>
        <button
          onClick={() => scrollToForm(careerFormRef)}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple_blue text-white font-semibold shadow-lg hover:shadow-xl hover:bg-purple-800 transition-all"
        >
          <Icon icon="mdi:plus-circle" width={20} />
          Add Job
        </button>
      </div>

      <div>
        <h3 className="font-bold text-xl mb-4">Manage Jobs ({careers.length})</h3>
        {careers.length === 0 && (
          <p className="text-sm text-gray-500 mb-6">No jobs listed yet. Add one below.</p>
        )}
        <div className="grid gap-4">
          {careers.map((job, index) => (
            <div
              key={job.id ?? `${job.title}-${index}`}
              className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-dark_black/40 p-5 shadow-sm hover:shadow-lg transition"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                {job.image && (
                  <img
                    src={job._imageFile ? URL.createObjectURL(job._imageFile) : job.image}
                    alt={job.title}
                    className="w-full md:w-40 h-40 object-cover rounded-lg border-2 border-purple_blue"
                  />
                )}
                <div className="flex-1 space-y-2">
                  <p className="font-semibold truncate">{job.title}</p>
                  <p className="text-sm text-gray-600">
                    {(job.department || "HABB") + (job.location ? ` • ${job.location}` : "")}
                  </p>
                  {job.employmentType && <p className="text-xs text-gray-500">{job.employmentType}</p>}
                  <p className="text-sm text-gray-600 line-clamp-3">{job.summary}</p>
                  {job.tags && <p className="text-xs text-gray-500">Tags: {job.tags}</p>}
                  {job.applyLink && (
                    <a href={job.applyLink} target="_blank" rel="noreferrer" className="text-sm text-blue-600">
                      Apply
                    </a>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleReorder(careers, setCareers, "/api/careers/reorder", index, "up")}
                    disabled={index === 0}
                    className="p-1.5 rounded bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Move up"
                  >
                    <Icon icon="mdi:arrow-up" width={16} />
                  </button>
                  <button
                    onClick={() => handleReorder(careers, setCareers, "/api/careers/reorder", index, "down")}
                    disabled={index === careers.length - 1}
                    className="p-1.5 rounded bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Move down"
                  >
                    <Icon icon="mdi:arrow-down" width={16} />
                  </button>
                  <button
                    onClick={() => {
                      setEditCareer({ ...job, _imageFile: null })
                      setShowEditCareer(true)
                    }}
                    className="px-3 py-1.5 rounded-lg bg-yellow-500 text-white text-sm font-medium hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCareerItem(job.id)}
                    className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={careerFormRef} className="mt-10 pt-8 border-t border-gray-200 dark:border-white/10">
        <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Icon icon="mdi:plus-circle" width={24} className="text-purple_blue" />
          Add New Job
        </h3>
        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={(event) => {
            event.preventDefault()
            void createCareerItem()
          }}
        >
          <div className="md:col-span-2">
            <label htmlFor="career-title" className="block text-sm font-medium mb-1.5">
              Title*
            </label>
            <input
              id="career-title"
              value={newCareer.title || ""}
              onChange={(event) => setNewCareer((prev) => ({ ...prev, title: event.target.value }))}
              placeholder="Software Engineer"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="career-department" className="block text-sm font-medium mb-1.5">
              Department
            </label>
            <input
              id="career-department"
              value={newCareer.department || ""}
              onChange={(event) => setNewCareer((prev) => ({ ...prev, department: event.target.value }))}
              placeholder="Engineering"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="career-location" className="block text-sm font-medium mb-1.5">
              Location
            </label>
            <input
              id="career-location"
              value={newCareer.location || ""}
              onChange={(event) => setNewCareer((prev) => ({ ...prev, location: event.target.value }))}
              placeholder="Remote"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
            />
          </div>
          <div>
            <label htmlFor="career-type" className="block text-sm font-medium mb-1.5">
              Employment Type
            </label>
            <input
              id="career-type"
              value={newCareer.employmentType || ""}
              onChange={(event) => setNewCareer((prev) => ({ ...prev, employmentType: event.target.value }))}
              placeholder="Full-time"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="career-summary" className="block text-sm font-medium mb-1.5">
              Summary*
            </label>
            <textarea
              id="career-summary"
              value={newCareer.summary || ""}
              onChange={(event) => setNewCareer((prev) => ({ ...prev, summary: event.target.value }))}
              placeholder="Describe the role and impact"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition min-h-32"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="career-link" className="block text-sm font-medium mb-1.5">
              Apply Link*
            </label>
            <input
              id="career-link"
              value={newCareer.applyLink || ""}
              onChange={(event) => setNewCareer((prev) => ({ ...prev, applyLink: event.target.value }))}
              placeholder="https://..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="career-tags" className="block text-sm font-medium mb-1.5">
              Tags
            </label>
            <input
              id="career-tags"
              value={newCareer.tags || ""}
              onChange={(event) => setNewCareer((prev) => ({ ...prev, tags: event.target.value }))}
              placeholder="Engineering, Remote"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="career-image" className="block text-sm font-medium mb-1.5">
              Image
            </label>
            <input
              id="career-image"
              key={`career-image-${careerImageKey}`}
              type="file"
              accept="image/*"
              onChange={(event) =>
                setNewCareer((prev) => ({ ...prev, _imageFile: event.target.files?.[0] || null }))
              }
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
            />
          </div>
          {newCareer._imageFile && (
            <div className="md:col-span-2 flex justify-center">
              <img
                src={URL.createObjectURL(newCareer._imageFile)}
                alt="Preview"
                className="w-full max-w-md h-48 object-cover rounded-xl border-4 border-purple_blue shadow-lg"
              />
            </div>
          )}
          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={resetCareerForm}
              className="px-5 py-2 rounded-lg border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-purple_blue text-white font-semibold shadow hover:bg-purple-800 transition"
            >
              Save Job
            </button>
          </div>
        </form>
      </div>
    </section>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#0a0a0a] dark:to-[#111]">
      <header className="bg-white dark:bg-dark_black border-b shadow-sm pt-8">
        <div className="max-w-7xl mx-auto px-6 pt-8 pb-4 flex flex-col items-center gap-3 text-center">
          <h1 className="text-3xl md:text-5xl font-bold instrument-font text-dark_black dark:text-white">
            HABB Admin Dashboard
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 transition"
            >
              <Icon icon="mdi:open-in-new" width={16} />
              View Site
            </Link>
            {(loading || saving) && (
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple_blue/10 text-purple_blue text-sm font-medium">
                <Icon icon={saving ? "mdi:loading" : "mdi:refresh"} width={16} className={saving ? "animate-spin" : ""} />
                {saving ? "Saving…" : "Loading…"}
              </span>
            )}
          </div>
        </div>
      </header>

      {renderModal({
        open: showEditTeam,
        title: "Edit Team Member",
        subtitle: "Update team profile",
        onClose: () => {
          setShowEditTeam(false)
          setEditTeam(null)
        },
        children:
          editTeam && (
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Name*</label>
                <input
                  defaultValue={editTeam.name}
                  onChange={(event) => setEditTeam((prev) => (prev ? { ...prev, name: event.target.value } : prev))}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Position*</label>
                <input
                  defaultValue={editTeam.position}
                  onChange={(event) => setEditTeam((prev) => (prev ? { ...prev, position: event.target.value } : prev))}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">LinkedIn</label>
                <input
                  defaultValue={editTeam.linkedinLink || ""}
                  onChange={(event) =>
                    setEditTeam((prev) => (prev ? { ...prev, linkedinLink: event.target.value } : prev))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setEditTeam((prev) =>
                      prev ? { ...prev, _imageFile: event.target.files?.[0] || null } : prev,
                    )
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                />
              </div>
              {(editTeam._imageFile || editTeam.image) && (
                <div className="flex justify-center">
                  <img
                    src={editTeam._imageFile ? URL.createObjectURL(editTeam._imageFile) : editTeam.image}
                    alt="Preview"
                    className="w-28 h-28 object-cover rounded-full border-4 border-purple_blue shadow-lg"
                  />
                </div>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowEditTeam(false)
                    setEditTeam(null)
                  }}
                  className="px-5 py-2 rounded-lg border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (!editTeam?.id) return
                    await updateTeamMember(editTeam)
                    setShowEditTeam(false)
                    setEditTeam(null)
                  }}
                  className="px-5 py-2 rounded-lg bg-purple_blue text-white font-semibold shadow hover:bg-purple-800 transition"
                >
                  Save
                </button>
              </div>
            </div>
          ),
      })}

      {renderModal({
        open: showEditFaq,
        title: "Edit FAQ",
        subtitle: "Update question and answer",
        onClose: () => {
          setShowEditFaq(false)
          setEditFaq(null)
        },
        children:
          editFaq && (
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Question*</label>
                <input
                  defaultValue={editFaq.faq_que}
                  onChange={(event) =>
                    setEditFaq((prev) => (prev ? { ...prev, faq_que: event.target.value } : prev))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Answer*</label>
                <textarea
                  defaultValue={editFaq.faq_ans}
                  onChange={(event) =>
                    setEditFaq((prev) => (prev ? { ...prev, faq_ans: event.target.value } : prev))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition min-h-24"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowEditFaq(false)
                    setEditFaq(null)
                  }}
                  className="px-5 py-2 rounded-lg border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (!editFaq?.id) return
                    await updateFaqItem(editFaq)
                    setShowEditFaq(false)
                    setEditFaq(null)
                  }}
                  className="px-5 py-2 rounded-lg bg-purple_blue text-white font-semibold shadow hover:bg-purple-800 transition"
                >
                  Save
                </button>
              </div>
            </div>
          ),
      })}

      {renderModal({
        open: showEditEvent,
        title: "Edit Blog Post",
        subtitle: "Update blog details",
        onClose: () => {
          setShowEditEvent(false)
          setEditEvent(null)
        },
        children:
          editEvent && (
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Title*</label>
                <input
                  defaultValue={editEvent.title}
                  onChange={(event) =>
                    setEditEvent((prev) => (prev ? { ...prev, title: event.target.value } : prev))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Excerpt</label>
                <textarea
                  defaultValue={editEvent.excerpt}
                  onChange={(event) =>
                    setEditEvent((prev) => (prev ? { ...prev, excerpt: event.target.value } : prev))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Content*</label>
                <textarea
                  defaultValue={editEvent.content}
                  onChange={(event) =>
                    setEditEvent((prev) => (prev ? { ...prev, content: event.target.value } : prev))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition min-h-48"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Author</label>
                  <input
                    defaultValue={editEvent.author}
                    onChange={(event) =>
                      setEditEvent((prev) => (prev ? { ...prev, author: event.target.value } : prev))
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Tags</label>
                  <input
                    defaultValue={Array.isArray(editEvent.tags) ? editEvent.tags.join(', ') : editEvent.tags || ''}
                    onChange={(event) =>
                      setEditEvent((prev) => (prev ? { ...prev, tags: event.target.value } : prev))
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setEditEvent((prev) =>
                      prev ? { ...prev, _imageFile: event.target.files?.[0] || null } : prev,
                    )
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                />
              </div>
              {(editEvent._imageFile || editEvent.image) && (
                <div className="flex justify-center">
                  <img
                    src={editEvent._imageFile ? URL.createObjectURL(editEvent._imageFile) : editEvent.image}
                    alt="Preview"
                    className="w-full max-w-md h-48 object-cover rounded-xl border-4 border-purple_blue shadow-lg"
                  />
                </div>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowEditEvent(false)
                    setEditEvent(null)
                  }}
                  className="px-5 py-2 rounded-lg border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (!editEvent?.id) return
                    await updateEventItem(editEvent)
                    setShowEditEvent(false)
                    setEditEvent(null)
                  }}
                  className="px-5 py-2 rounded-lg bg-purple_blue text-white font-semibold shadow hover:bg-purple-800 transition"
                >
                  Save
                </button>
              </div>
            </div>
          ),
      })}

      {renderModal({
        open: showEditCareer,
        title: "Edit Job",
        subtitle: "Update job posting",
        onClose: () => {
          setShowEditCareer(false)
          setEditCareer(null)
        },
        children:
          editCareer && (
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Title*</label>
                <input
                  defaultValue={editCareer.title}
                  onChange={(event) =>
                    setEditCareer((prev) => (prev ? { ...prev, title: event.target.value } : prev))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Department</label>
                  <input
                    defaultValue={editCareer.department || ""}
                    onChange={(event) =>
                      setEditCareer((prev) => (prev ? { ...prev, department: event.target.value } : prev))
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Location</label>
                  <input
                    defaultValue={editCareer.location || ""}
                    onChange={(event) =>
                      setEditCareer((prev) => (prev ? { ...prev, location: event.target.value } : prev))
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Employment Type</label>
                <input
                  defaultValue={editCareer.employmentType || ""}
                  onChange={(event) =>
                    setEditCareer((prev) =>
                      prev ? { ...prev, employmentType: event.target.value } : prev,
                    )
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Summary*</label>
                <textarea
                  defaultValue={editCareer.summary}
                  onChange={(event) =>
                    setEditCareer((prev) => (prev ? { ...prev, summary: event.target.value } : prev))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition min-h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Apply Link*</label>
                <input
                  defaultValue={editCareer.applyLink || ""}
                  onChange={(event) =>
                    setEditCareer((prev) => (prev ? { ...prev, applyLink: event.target.value } : prev))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Tags</label>
                <input
                  defaultValue={editCareer.tags || ""}
                  onChange={(event) =>
                    setEditCareer((prev) => (prev ? { ...prev, tags: event.target.value } : prev))
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setEditCareer((prev) =>
                      prev ? { ...prev, _imageFile: event.target.files?.[0] || null } : prev,
                    )
                  }
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-white/20 bg-white dark:bg-dark_black focus:ring-2 focus:ring-purple_blue outline-none transition"
                />
              </div>
              {(editCareer._imageFile || editCareer.image) && (
                <div className="flex justify-center">
                  <img
                    src={editCareer._imageFile ? URL.createObjectURL(editCareer._imageFile) : editCareer.image}
                    alt="Preview"
                    className="w-full max-w-md h-48 object-cover rounded-xl border-4 border-purple_blue shadow-lg"
                  />
                </div>
              )}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowEditCareer(false)
                    setEditCareer(null)
                  }}
                  className="px-5 py-2 rounded-lg border border-gray-300 dark:border-white/20 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    if (!editCareer?.id) return
                    await updateCareerItem(editCareer)
                    setShowEditCareer(false)
                    setEditCareer(null)
                  }}
                  className="px-5 py-2 rounded-lg bg-purple_blue text-white font-semibold shadow hover:bg-purple-800 transition"
                >
                  Save
                </button>
              </div>
            </div>
          ),
      })}

      <div className="bg-white dark:bg-dark_black border-b border-gray-200 dark:border-white/10">
        <div className="w-full px-6">
          <div className="flex flex-wrap">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-purple_blue text-purple_blue font-semibold"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                <Icon icon={tab.icon} width={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="w-full px-6 py-6">
        <div className="grid md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl bg-white dark:bg-dark_black border border-gray-200 dark:border-white/10 p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <div className={`h-10 w-10 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <Icon icon={stat.icon} width={22} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <main className="bg-white dark:bg-dark_black w-full px-6 py-8 space-y-8">
        {activeTab === "team" && renderTeamSection()}
        {activeTab === "faq" && renderFaqSection()}
        {activeTab === "events" && renderEventsSection()}
        {activeTab === "careers" && renderCareersSection()}
      </main>
    </div>
  )
}
