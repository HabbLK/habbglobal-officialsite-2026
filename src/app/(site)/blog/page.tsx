"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { TextGenerateEffect } from '@/app/components/ui/text-generate-effect'
import { Icon } from '@iconify/react'
import WatermarkLogo from '@/app/components/shared/watermark-logo'

type BlogPost = {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  tags: string[]
  image: string
  createdAt: string
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setBlogs(data || [])
      } catch (err) {
        console.error(err)
      }
    }

    fetchBlogs()
  }, [])

  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedBlog])

  return (
    <>
      <main className="min-h-screen relative overflow-hidden">
        <WatermarkLogo size={1000} opacity={0.02} rotate={15} className="-right-40 top-10" />
        <div className='relative w-full pt-44 2xl:pb-20 pb-10 before:absolute before:w-full before:h-full before:bg-linear-to-r before:from-blue_gradient before:via-white before:to-yellow_gradient before:rounded-full before:top-24 before:blur-3xl before:-z-10 dark:before:from-dark_blue_gradient dark:before:via-black dark:before:to-dark_yellow_gradient dark:before:rounded-full dark:before:blur-3xl dark:before:-z-10'>
          <div className="container relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <TextGenerateEffect words="Updates,Highlights" />
                <TextGenerateEffect
                  words="Stories"
                  delay={0.5}
                  className="italic font-normal instrument-font"
                />
              </h1>
              <p className="text-lg md:text-xl text-dark_black/70 dark:text-white/70 max-w-2xl mx-auto">
                Discover our community events, showcases, and milestones — stories that show how HABB connects and grows.
              </p>
            </div>
          </div>
        </div>

        <div className="container py-12 md:py-16">
          {blogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-dark_black/60 dark:text-white/60">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-7xl mx-auto">
              {blogs.map((blog, index) => (
                <article
                  key={blog.id || index}
                  onClick={() => setSelectedBlog(blog)}
                  className="group p-6 md:p-8 rounded-3xl bg-white dark:bg-white/5 border border-dark_black/10 dark:border-white/10 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                >
                  {blog.image && (
                    <div className="mb-6 w-full overflow-hidden rounded-xl bg-gray-50 dark:bg-white/5 relative aspect-square md:h-64 md:aspect-auto">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <h2 className="text-xl md:text-2xl font-bold group-hover:text-purple_blue transition-colors line-clamp-2">{blog.title}</h2>
                    <p className="text-sm text-dark_black/60 dark:text-white/60 mt-2">
                      By {blog.author || 'HABB Team'} • {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-purple_blue/10 text-purple_blue rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                      {blog.tags.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 dark:bg-white/10 text-dark_black/60 dark:text-white/60 rounded-full text-xs font-medium">
                          +{blog.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <p className="text-dark_black/80 dark:text-white/80 mb-6 leading-relaxed line-clamp-3">
                    {blog.excerpt || blog.content?.substring(0, 150) + '...'}
                  </p>

                  <div className="pt-4 border-t border-dark_black/10 dark:border-white/10">
                    <span className="inline-flex items-center gap-2 text-purple_blue font-medium group-hover:gap-3 transition-all">
                      Read full article
                      <Icon icon="mdi:arrow-right" width={20} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>

      {selectedBlog && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-0 md:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedBlog(null)
          }}
        >
          <div className="relative bg-white dark:bg-dark_black w-full h-full md:h-auto md:rounded-3xl max-w-full md:max-w-5xl shadow-2xl md:my-8 overflow-y-auto">
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute md:absolute top-3 right-3 md:top-4 md:right-4 z-20 p-3 rounded-full bg-dark_black/90 dark:bg-white/90 text-white dark:text-dark_black hover:bg-dark_black dark:hover:bg-white transition-all shadow-lg"
              aria-label="Close"
            >
              <Icon icon="mdi:close" width={24} />
            </button>

            <div className="p-4 md:p-12 lg:p-16">
              {selectedBlog.image && (
                <div className="mb-8 rounded-none md:rounded-2xl overflow-hidden md:-mx-6">
                  <div className="relative w-full aspect-square md:h-96 md:aspect-auto">
                    <Image
                      src={selectedBlog.image}
                      alt={selectedBlog.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">{selectedBlog.title}</h1>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm md:text-base text-dark_black/60 dark:text-white/60">
                  <span className="flex items-center gap-2">
                    <Icon icon="mdi:account" width={20} />
                    {selectedBlog.author || 'HABB Team'}
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-2">
                    <Icon icon="mdi:calendar" width={20} />
                    {new Date(selectedBlog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedBlog.tags.map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-purple_blue/10 text-purple_blue rounded-full text-sm font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="prose prose-base md:prose-lg dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap leading-relaxed text-dark_black/90 dark:text-white/90 text-base md:text-lg">
                  {selectedBlog.content}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-dark_black/10 dark:border-white/10">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple_blue text-white font-medium hover:bg-purple-800 transition-all"
                >
                  <Icon icon="mdi:arrow-left" width={20} />
                  Back to all posts
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

