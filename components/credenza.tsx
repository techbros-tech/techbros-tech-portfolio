"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

interface BaseProps {
  children: React.ReactNode
}

interface RootCredenzaProps extends BaseProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface CredenzaProps extends BaseProps {
  className?: string
  asChild?: true
}

const CredenzaContext = React.createContext<{ isMobile: boolean }>({
  isMobile: false,
})

const useCredenzaContext = () => {
  const context = React.useContext(CredenzaContext)
  if (!context) {
    throw new Error(
      "Credenza components cannot be rendered outside the Credenza Context"
    )
  }
  return context
}

const Credenza = ({ children, ...props }: RootCredenzaProps) => {
  const isMobile = useIsMobile()
  const CredenzaComponent = isMobile ? Drawer : Dialog

  return (
    <CredenzaContext.Provider value={{ isMobile }}>
      <CredenzaComponent {...props} {...(isMobile && { autoFocus: true })}>
        {children}
      </CredenzaComponent>
    </CredenzaContext.Provider>
  )
}

const CredenzaTrigger = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const TriggerComponent = isMobile ? DrawerTrigger : DialogTrigger

  return (
    <TriggerComponent className={className} {...props}>
      {children}
    </TriggerComponent>
  )
}

const CredenzaClose = React.forwardRef<
  React.ElementRef<typeof DialogClose>,
  React.ComponentPropsWithoutRef<typeof DialogClose>
>(({ className, children, ...props }, ref) => {
  const { isMobile } = useCredenzaContext()
  const CloseComponent = isMobile ? DrawerClose : DialogClose

  return (
    <CloseComponent className={className} {...props} ref={ref}>
      {children}
    </CloseComponent>
  )
})
CredenzaClose.displayName = "CredenzaClose"

const CredenzaContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogContent>
>(({ className, children, ...props }, ref) => {
  const { isMobile } = useCredenzaContext()
  const ContentComponent = isMobile ? DrawerContent : DialogContent

  return (
    <ContentComponent className={className} {...props} ref={ref}>
      {children}
    </ContentComponent>
  )
})
CredenzaContent.displayName = "CredenzaContent"

const CredenzaDescription = React.forwardRef<
  React.ElementRef<typeof DialogDescription>,
  React.ComponentPropsWithoutRef<typeof DialogDescription>
>(({ className, children, ...props }, ref) => {
  const { isMobile } = useCredenzaContext()
  const DescriptionComponent = isMobile ? DrawerDescription : DialogDescription

  return (
    <DescriptionComponent className={className} {...props} ref={ref}>
      {children}
    </DescriptionComponent>
  )
})
CredenzaDescription.displayName = "CredenzaDescription"

const CredenzaHeader = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const HeaderComponent = isMobile ? DrawerHeader : DialogHeader

  return (
    <HeaderComponent className={className} {...props}>
      {children}
    </HeaderComponent>
  )
}

const CredenzaTitle = React.forwardRef<
  React.ElementRef<typeof DialogTitle>,
  React.ComponentPropsWithoutRef<typeof DialogTitle>
>(({ className, children, ...props }, ref) => {
  const { isMobile } = useCredenzaContext()
  const TitleComponent = isMobile ? DrawerTitle : DialogTitle

  return (
    <TitleComponent className={className} {...props} ref={ref}>
      {children}
    </TitleComponent>
  )
})
CredenzaTitle.displayName = "CredenzaTitle"

const CredenzaBody = ({ className, children, ...props }: CredenzaProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  )
}

const CredenzaFooter = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile } = useCredenzaContext()
  const FooterComponent = isMobile ? DrawerFooter : DialogFooter

  return (
    <FooterComponent className={className} {...props}>
      {children}
    </FooterComponent>
  )
}

export {
  Credenza,
  CredenzaTrigger,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
}
