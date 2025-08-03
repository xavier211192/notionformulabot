'use client'
import { Zap, BookOpen } from 'lucide-react'

interface TabSwitcherProps {
  activeTab: 'generate' | 'explain'
  onTabChange: (tab: 'generate' | 'explain') => void
}

export function TabSwitcher({ activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="bg-gray-100 p-1 rounded-lg inline-flex">
        <button
          onClick={() => onTabChange('generate')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
            activeTab === 'generate'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Zap className="w-4 h-4 mr-2" />
          Generate Formula
        </button>
        <button
          onClick={() => onTabChange('explain')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center ${
            activeTab === 'explain'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Explain Formula
        </button>
      </div>
    </div>
  )
}