"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Plus } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import IndianAlternatives from "./IndianAlternativesDisplay"

export function HealthAnalysisDisplay({ data }) {
  const [activeTab, setActiveTab] = useState("conditions")
  const [showAll, setShowAll] = useState({
    conditions: false,
    symptoms: false,
    remedies: false,
    precautions: false
  })

  if (!data) return null

  // Check if we have Indian alternatives data
  const hasIndianAlternatives = data.indianAlternatives && Object.keys(data.indianAlternatives).length > 0

  const toggleShowAll = (tab) => {
    setShowAll(prev => ({
      ...prev,
      [tab]: !prev[tab]
    }))
  }

  return (
    <div className="space-y-2 sm:space-y-3 md:space-y-4">
      <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3">
        <Button
          size="sm"
          variant={activeTab === "conditions" ? "default" : "outline"}
          className={`text-xs sm:text-sm h-7 sm:h-8 md:h-9 px-2 sm:px-3 ${
            activeTab === "conditions"
              ? "bg-cyan-600 hover:bg-cyan-500 text-white"
              : "bg-transparent border-cyan-700 text-cyan-300 hover:bg-cyan-800/50"
          }`}
          onClick={() => setActiveTab("conditions")}
        >
          <span className="block sm:hidden">Conditions</span>
          <span className="hidden sm:block cursor-pointer">Possible Conditions</span>
        </Button>

        {data.symptoms && data.symptoms.length > 0 && (
          <Button
            size="sm"
            variant={activeTab === "symptoms" ? "default" : "outline"}
            className={`text-xs sm:text-sm h-7 sm:h-8 md:h-9 px-2 sm:px-3 ${
              activeTab === "symptoms"
                ? "bg-cyan-600 hover:bg-cyan-500 text-white"
                : "bg-transparent border-cyan-700 text-cyan-300 hover:bg-cyan-800/50"
            }`}
            onClick={() => setActiveTab("symptoms")}
          >
            <span className="block sm:hidden">Symptoms</span>
            <span className="hidden sm:block cursor-pointer">Common Symptoms</span>
          </Button>
        )}

        {data.remedies && data.remedies.length > 0 && (
          <Button
            size="sm"
            variant={activeTab === "remedies" ? "default" : "outline"}
            className={`text-xs sm:text-sm h-7 sm:h-8 md:h-9 px-2 sm:px-3 ${
              activeTab === "remedies"
                ? "bg-cyan-600 hover:bg-cyan-500 text-white"
                : "bg-transparent border-cyan-700 text-cyan-300 hover:bg-cyan-800/50"
            }`}
            onClick={() => setActiveTab("remedies")}
          >
            <span className="whitespace-nowrap cursor-pointer">Remedies</span>
          </Button>
        )}

        {data.precautions && data.precautions.length > 0 && (
          <Button
            size="sm"
            variant={activeTab === "precautions" ? "default" : "outline"}
            className={`text-xs sm:text-sm h-7 sm:h-8 md:h-9 px-2 sm:px-3 ${
              activeTab === "precautions"
                ? "bg-cyan-600 hover:bg-cyan-500 text-white"
                : "bg-transparent border-cyan-700 text-cyan-300 hover:bg-cyan-800/50"
            }`}
            onClick={() => setActiveTab("precautions")}
          >
            <span className="block sm:hidden">Caution</span>
            <span className="hidden sm:block cursor-pointer">Precautions</span>
          </Button>
        )}

        {/* Add tab for Indian Alternatives */}
        {hasIndianAlternatives && (
          <Button
            size="sm"
            variant={activeTab === "alternatives" ? "default" : "outline"}
            className={`text-xs sm:text-sm h-7 sm:h-8 md:h-9 px-2 sm:px-3 ${
              activeTab === "alternatives"
                ? "bg-cyan-600 hover:bg-cyan-500 text-white"
                : "bg-transparent border-cyan-700 text-cyan-300 hover:bg-cyan-800/50"
            }`}
            onClick={() => setActiveTab("alternatives")}
          >
            <span className="block sm:hidden">Meds</span>
            <span className="hidden sm:block cursor-pointer">Suggested Medications</span>
          </Button>
        )}
      </div>

      <div className="w-full cursor-pointer">
        {activeTab === "conditions" && data.possibleConditions && (
          <AnalysisSection 
            items={data.possibleConditions} 
            type="conditions" 
            title="Possible Conditions"
            showAll={showAll.conditions}
            toggleShowAll={() => toggleShowAll("conditions")}
          />
        )}

        {activeTab === "symptoms" && data.symptoms && (
          <AnalysisSection 
            items={data.symptoms} 
            type="symptoms" 
            title="Common Symptoms"
            showAll={showAll.symptoms}
            toggleShowAll={() => toggleShowAll("symptoms")} 
          />
        )}

        {activeTab === "remedies" && data.remedies && (
          <AnalysisSection 
            items={data.remedies} 
            type="remedies" 
            title="Recommended Remedies"
            showAll={showAll.remedies}
            toggleShowAll={() => toggleShowAll("remedies")}
          />
        )}

        {activeTab === "precautions" && data.precautions && (
          <AnalysisSection 
            items={data.precautions} 
            type="precautions" 
            title="Precautions & When to Seek Help"
            showAll={showAll.precautions}
            toggleShowAll={() => toggleShowAll("precautions")}
          />
        )}

        {/* Add section for Indian Alternatives */}
        {activeTab === "alternatives" && hasIndianAlternatives && <IndianAlternatives data={data} />}
      </div>
    </div>
  )
}

// Updated AnalysisSection component to show only 3 items initially
function AnalysisSection({ items, type, title, showAll, toggleShowAll }) {
  const [expandedItem, setExpandedItem] = useState(null)

  if (!items || items.length === 0) return null

  const toggleItem = (itemName) => {
    if (expandedItem === itemName) {
      setExpandedItem(null)
    } else {
      setExpandedItem(itemName)
    }
  }

  // Show only 3 items initially, unless showAll is true
  const displayItems = showAll ? items : items.slice(0, 3)
  const hasMoreItems = items.length > 3

  return (
    <Card className="bg-cyan-800/20 border-cyan-800 w-full">
      <CardHeader className="pb-2 px-3 sm:px-4 md:px-6 pt-3 sm:pt-4">
        <CardTitle className="text-sm sm:text-base md:text-lg text-white flex flex-wrap items-center gap-2">
          <span>{title}</span>
          {type === "conditions" && (
            <Badge variant="outline" className="bg-cyan-700/50 text-cyan-100 border-cyan-600 text-xs">
              {items.length} identified
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-2 px-3 sm:px-4 md:px-6">
        <div className="space-y-2 md:space-y-3">
          {displayItems.map((item, index) => (
            <div key={index} className="rounded-md overflow-hidden border border-cyan-700/50">
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between p-2 sm:p-3 bg-cyan-700/30 hover:bg-cyan-700/50 text-left h-auto"
                onClick={() => toggleItem(item.name)}
              >
                <div className="font-medium text-xs sm:text-sm md:text-base text-cyan-100 pr-2">{item.name}</div>
                {expandedItem === item.name ? (
                  <ChevronUp size={16} className="text-cyan-300 flex-shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-cyan-300 flex-shrink-0" />
                )}
              </Button>

              {expandedItem === item.name && (
                <div className="p-2 sm:p-3 md:p-4 bg-cyan-800/10">
                  {/* Show shorter description on mobile, full description on larger screens */}
                  <p className="block sm:hidden text-xs text-cyan-200">
                    {item.shortDescription || truncateText(item.description, 100)}
                  </p>
                  <p className="hidden sm:block text-sm text-cyan-200">{item.description}</p>
                </div>
              )}
            </div>
          ))}
          
          {/* Show more/less button if there are more than 3 items */}
          {hasMoreItems && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleShowAll}
              className="w-full mt-2 border-cyan-700/50 text-cyan-300 hover:bg-cyan-800/50 flex items-center justify-center gap-1"
            >
              {!showAll ? (
                <>
                  <Plus size={14} />
                  <span>Show {items.length - 3} more</span>
                </>
              ) : (
                <span>Show less</span>
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function to truncate text for smaller screens
function truncateText(text, maxLength) {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + "..."
}