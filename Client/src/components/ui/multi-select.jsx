import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command"

export const MultiSelect = React.forwardRef(
    (
        {
            options = [],
            value = [],
            onValueChange,
            placeholder = "What genres you enjoy most?",
            className,
            maxSelection,
            ...props
        },
        ref
    ) => {
        const [open, setOpen] = React.useState(false)

        const safeOptions = Array.isArray(options) ? options : []
        const safeValue = Array.isArray(value) ? value : []

        const toggleOption = (val) => {
            if (!onValueChange) return
            if (!safeValue.includes(val) && safeValue.length >= maxSelection) {
                return
            }
            if (safeValue.includes(val)) {
                onValueChange(safeValue.filter((v) => v !== val))
            } else {
                onValueChange([...safeValue, val])
            }
        }

        const selectedLabels = safeOptions
            .filter((opt) => safeValue.includes(opt.value))
            .map((opt) => opt.label)
            .join(", ")

        return (
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        ref={ref}
                        variant="outline"
                        role="combobox"
                        className={cn(
                            "h-10 w-full justify-between rounded-md px-3 py-2 text-sm font-normal",
                            "bg-[#1b1b1b] border border-[#F5C518] text-white",
                            "hover:bg-[#1b1b1b]",
                            "focus:outline-none focus:ring-1 focus:ring-[#F5C518]",
                            className
                        )}
                        {...props}
                    >
                        <span
                            className={cn(
                                "truncate",
                                !selectedLabels && "text-muted-foreground"
                            )}
                        >
                            {selectedLabels || placeholder}
                        </span>

                        <ChevronDown className="h-4 w-4 opacity-60" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className={cn(
                        "w-[--radix-popover-trigger-width] p-1",
                        "bg-[#1b1b1b] border border-[#F5C518] rounded-md",
                        "shadow-lg shadow-[#F5C518]/10"
                    )}
                >
                    <Command className="bg-transparent">
                        <CommandEmpty className="py-4 text-center text-sm text-muted-foreground">
                            No option found.
                        </CommandEmpty>

                        <CommandGroup>
                            {safeOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => toggleOption(option.value)}
                                    className={cn(
                                        "flex cursor-pointer items-center rounded-sm px-2 py-1.5",
                                        "text-white aria-selected:bg-[#252525]",
                                        "hover:bg-[#252525]"
                                    )}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4 text-[#F5C518]",
                                            safeValue.includes(option.value)
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </Command>
                </PopoverContent>
            </Popover>
        )
    }
)

MultiSelect.displayName = "MultiSelect"

export default MultiSelect
