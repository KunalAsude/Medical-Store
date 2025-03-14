"use client"

import { useState, useEffect } from "react"
import { Thermometer, Stethoscope, ShieldCheck, Info, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export const FormattedMedicalResponse = ({ data, initialItemsToShow = 3 }) => {
  const [expandedSections, setExpandedSections] = useState({
    summary: false,
    symptoms: false,
    remedies: false,
    precautions: false,
  })
  const [isMobile, setIsMobile] = useState(false)


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkMobile()
    

    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const mobileItemsToShow = isMobile ? 2 : initialItemsToShow

  if (data.error) {
    return <div className="text-red-400 p-2 bg-red-950/30 rounded-md text-sm">{data.error}</div>
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }


  const renderToggleButton = (section, itemCount, initialCount) => {
    const showAll = expandedSections[section]
    const hasMore = itemCount > initialCount

    if (!hasMore) return null

    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => toggleSection(section)}
        className="text-teal-400 hover:text-teal-300 hover:bg-teal-950/50 mt-1 h-6 px-2 w-full flex justify-between text-xs"
      >
        <span>{showAll ? "Show less" : `Show ${itemCount - initialCount} more`}</span>
        {showAll ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
      </Button>
    )
  }

  const cleanListItems = (items = []) => {
    if (!items || !items.length) return [];
    
 
    return items.filter(item => {
      const cleaned = item.replace(/^\s*\*\s*/, '')  
                         .replace(/^\s*\d+\.\s*/, '')  
                         .trim();
      return cleaned.length > 1; 
    });
  }

  const renderList = (items = [], section) => {
    if (!items || !items.length) return null;

    const cleanedItems = cleanListItems(items);
    

    if (cleanedItems.length === 0) {
      return <p className="text-teal-300 italic text-sm">Information not available</p>;
    }
    
    const showAll = expandedSections[section]
    const displayItems = showAll ? cleanedItems : cleanedItems.slice(0, mobileItemsToShow)

    return (
      <>
        <ul className="space-y-1.5 pl-4">
          {displayItems.map((item, index) => (
            <li key={index} className="list-disc text-teal-100 leading-tight text-sm">
              {item}
            </li>
          ))}
        </ul>

        {renderToggleButton(section, cleanedItems.length, mobileItemsToShow)}
      </>
    )
  }

  
  const summarySectionRenderer = () => {
    if (!data.summary) return null
    
    const cleanSummary = data.summary
      .replace(/\*\*Brief Summary:\*\*\s*/g, "")
      .replace(/\*\*Summary:\*\*\s*/g, "")
      .trim()
    
    const lastChar = cleanSummary.slice(-1);
    const hasCompleteEnding = ['.', '!', '?'].includes(lastChar);
    
    const displaySummary = hasCompleteEnding ? 
      cleanSummary : 
      cleanSummary + '...';
    
    
    const sentences = displaySummary.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
    const isLongSummary = sentences.length > 2

    const showAll = expandedSections.summary
    const truncatedSummary = (isMobile && isLongSummary && !showAll) 
      ? sentences.slice(0, 2).join(' ') + (sentences.length > 2 ? '...' : '')
      : displaySummary
    
    return (
      <div className="mb-3 pb-2 border-b border-teal-800/40">
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="bg-teal-900/60 p-1 rounded-md">
            <Info className="h-3.5 w-3.5 text-teal-400" />
          </div>
          <span className="font-medium text-teal-300 text-sm">Summary</span>
        </div>
        <p className="text-teal-100 leading-relaxed text-sm">{truncatedSummary}</p>
        
        {isMobile && isLongSummary && renderToggleButton('summary', sentences.length, 2)}
      </div>
    )
  }

  // Check if there's any actual content to display
  const hasSymptoms = data.symptoms && cleanListItems(data.symptoms).length > 0;
  const hasRemedies = data.remedies && cleanListItems(data.remedies).length > 0;
  const hasPrecautions = data.precautions && cleanListItems(data.precautions).length > 0;
  const hasSummary = Boolean(data.summary);

  return (
    <div className="space-y-4 text-teal-100 p-3 sm:p-4 bg-teal-950/40 rounded-lg border border-teal-900/60 shadow-md">
      {/* Summary Section */}
      {summarySectionRenderer()}

      {/* Symptoms Section */}
      {hasSymptoms && (
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="bg-red-900/30 p-1 rounded-md">
              <Thermometer className="h-3.5 w-3.5 text-red-400" />
            </div>
            <span className="font-medium text-teal-300 text-sm">Key Symptoms</span>
          </div>
          {renderList(data.symptoms, "symptoms")}
        </div>
      )}

      {/* Remedies Section */}
      {hasRemedies && (
        <div className="mb-3">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="bg-green-900/30 p-1 rounded-md">
              <Stethoscope className="h-3.5 w-3.5 text-green-400" />
            </div>
            <span className="font-medium text-teal-300 text-sm">Home Remedies</span>
          </div>
          {renderList(data.remedies, "remedies")}
        </div>
      )}

      {/* Precautions Section */}
      {hasPrecautions && (
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="bg-blue-900/30 p-1 rounded-md">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
            </div>
            <span className="font-medium text-teal-300 text-sm">Precautions</span>
          </div>
          {renderList(data.precautions, "precautions")}
        </div>
      )}

      {!hasSummary && !hasSymptoms && !hasRemedies && !hasPrecautions && (
        <div className="text-teal-300 italic text-center py-2 text-sm">
          I couldn't find specific information about that. Would you like to ask about something else?
        </div>
      )}
    </div>
  )
}