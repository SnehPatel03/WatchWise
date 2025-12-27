import React from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const CustomSelect = ({ options, value, onChange, placeholder, label }) => {
    return (
        <div>
            {label && (
                <label className="block text-md font-semibold text-[#F5C518] mb-2">
                    {label}
                </label>
            )}
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full bg-[#1b1b1b] text-gray-200 border-2 border-gray-700 hover:border-[#F5C518] rounded-lg px-4 py-3 focus:outline-none focus:border-[#F5C518] focus:ring-2 focus:ring-[#F5C518]/50 transition-all">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="bg-[#252525] border-2 border-[#F5C518]/50 rounded-lg">
                    <SelectGroup>
                        {options.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                className="text-gray-200 hover:bg-[#F5C518]/20 hover:text-[#F5C518] focus:bg-[#F5C518]/20 focus:text-[#F5C518] cursor-pointer py-2 px-3 rounded"
                            >
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    )
}

export default CustomSelect