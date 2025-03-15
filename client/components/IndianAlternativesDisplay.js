"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, MinusCircle } from 'lucide-react';

const IndianAlternatives = ({ data }) => {
    const [expandedDrug, setExpandedDrug] = useState(null);
    const [expandedAlternatives, setExpandedAlternatives] = useState({});

    const toggleDrug = (drugName) => {
        if (expandedDrug === drugName) {
            setExpandedDrug(null);
        } else {
            setExpandedDrug(drugName);
        }
    };

    const toggleAlternatives = (drugName, e) => {
        e.stopPropagation();
        setExpandedAlternatives(prev => ({
            ...prev,
            [drugName]: !prev[drugName]
        }));
    };

    // Check if data exists and has alternatives
    if (!data || !data.indianAlternatives || Object.keys(data.indianAlternatives).length === 0) {
        return null;
    }

    const { indianAlternatives, alternativesStats } = data;

    return (
        <div className="mt-4">
            <div className="bg-cyan-800/30 rounded-lg border border-cyan-700 p-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-cyan-100">Indian Generic Alternatives</h3>
                    {alternativesStats && (
                        <div className="text-xs px-2 py-1 bg-cyan-700/50 rounded-md text-cyan-100">
                            {alternativesStats.coverage}% coverage • {alternativesStats.totalAlternatives} alternatives
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    {Object.entries(indianAlternatives).map(([drugName, drugInfo]) => {
                        const isExpanded = expandedAlternatives[drugName] || false;
                        const alternatives = drugInfo.indian_alternatives || [];
                        const displayAlternatives = isExpanded ? alternatives : alternatives.slice(0, 3);
                        const hasMore = alternatives.length > 3;

                        return (
                            <div key={drugName} className="border border-cyan-700/50 rounded-lg overflow-hidden">
                                <div
                                    className={`flex items-center justify-between p-3 cursor-pointer ${expandedDrug === drugName ? 'bg-cyan-700/50' : 'bg-cyan-800/40'
                                        }`}
                                    onClick={() => toggleDrug(drugName)}
                                >
                                    <div>
                                        <div className="font-medium text-cyan-100">{drugName}</div>
                                        <div className="text-xs text-cyan-300">Generic: {drugInfo.original_generic}</div>
                                    </div>
                                    {expandedDrug === drugName ?
                                        <ChevronUp className="text-cyan-300" size={20} /> :
                                        <ChevronDown className="text-cyan-300" size={20} />
                                    }
                                </div>

                                {expandedDrug === drugName && (
                                    <div className="px-3 py-2 bg-cyan-800/20 border-t border-cyan-700/40">
                                        <div className="text-xs text-cyan-400 mb-2">
                                            Original Manufacturer: {drugInfo.original_manufacturer}
                                        </div>

                                        <div className="text-sm font-medium text-cyan-100 mb-2">
                                            Available Generic Alternatives:
                                        </div>

                                        <div className="space-y-2">
                                            {displayAlternatives.map((alternative, index) => (
                                                <div key={index} className="bg-cyan-800/30 rounded p-2">
                                                    <div className="font-medium text-white">{alternative.generic_name}</div>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <span className="text-xs text-cyan-300">Unit: {alternative.unit_size}</span>
                                                        <div className="flex items-center text-xs font-medium text-cyan-100 bg-cyan-700/50 px-2 py-1 rounded">
                                                            <span className="mr-1">₹</span>
                                                            {alternative.mrp}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}



                                            {hasMore && (
                                                <button
                                                    className="w-full flex items-center justify-center space-x-1 py-2 bg-cyan-700/30 hover:bg-cyan-700/50 rounded text-cyan-200 text-sm transition-colors"
                                                    onClick={(e) => toggleAlternatives(drugName, e)}
                                                >
                                                    {isExpanded ? (
                                                        <>
                                                            <MinusCircle size={16} />
                                                            <span>Show Less</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Plus size={16} />
                                                            <span>Show {alternatives.length - 3} More</span>
                                                        </>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default IndianAlternatives;