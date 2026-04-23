import React from 'react'

interface UKAccentBorderProps {
  position?: 'left' | 'right' | 'top' | 'bottom'
  thickness?: string
  color?: string
}

export default function UKAccentBorder({
  position = 'left',
  thickness = '4px',
  color = '#059669'
}: UKAccentBorderProps) {
  const baseClasses = 'absolute'

  const positionClasses: { [key: string]: string } = {
    left: `${baseClasses} left-0 top-0 bottom-0 w-1`,
    right: `${baseClasses} right-0 top-0 bottom-0 w-1`,
    top: `${baseClasses} top-0 left-0 right-0 h-1`,
    bottom: `${baseClasses} bottom-0 left-0 right-0 h-1`
  }

  return (
    <div
      className={positionClasses[position]}
      style={{
        backgroundColor: color,
        boxShadow: `inset 0 0 20px rgba(5, 150, 105, 0.3)`
      }}
    />
  )
}
