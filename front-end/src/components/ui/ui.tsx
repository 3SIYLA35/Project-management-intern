import * as React from 'react';
import {cn} from '../../lib/utils';
import {toast} from "sonner";

 const Input=React.forwardRef<
 HTMLInputElement,
 React.ComponentProps<"input">
 >(({className,type,...props},Ref)=>{
  return(
    <input type={type}
    className={cn("flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none border-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 pr-4 py-3  rounded-lg outline-none transition-colors",
        className
    )}
    {...props}
    ref={Ref}
    />
  )
 }
)
Input.displayName="Input";


export {Input};
  function useToast(): { toast: any; } {
    throw new Error('Function not implemented.');
  }

