import { Close } from "modules/_common/components/Icons";
import {
  Fragment,
  useState,
  useRef,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  cloneElement,
} from "react";
import { Dialog as UiDialog, Transition } from "@headlessui/react";

type TModalContext = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  initialFocusRef: React.RefObject<HTMLInputElement>;
};

export type TModalProps = {
  children: React.ReactNode;
};

// Keep context within same file as hook and Modal
//  so that we don't need to export ModalContext. We want
//  to be able to access the context only vie the useModal hook.
const ModalContext = createContext<TModalContext | undefined>(undefined);
ModalContext.displayName = "ModalContext";

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("🚨 useModal must be used within a <Modal /> component");
  }
  return context;
}

export function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const initialFocusRef = useRef<HTMLInputElement>(null);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen, initialFocusRef }}>
      {children}
    </ModalContext.Provider>
  );
}

Modal.ContentBase = ContentBase;
Modal.Content = Content;
Modal.DismissButton = DismissButton;
Modal.OpenButton = OpenButton;

function ContentBase({ children, ...props }: { children: React.ReactNode }) {
  return <Dialog {...props}>{children}</Dialog>;
}

function Content({ children, ...props }: { children: React.ReactNode }) {
  return (
    <ContentBase {...props}>
      <div className="hidden absolute top-0 right-0 pt-4 pr-4 sm:block">
        <DismissButton>
          <button type="button" className="text-gray-300 hover:text-black">
            <span className="sr-only">Close</span>
            <Close />
          </button>
        </DismissButton>
      </div>
      {children}
    </ContentBase>
  );
}

function Dialog({ children, ...props }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen, initialFocusRef } = useModal();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <UiDialog
        as="div"
        static
        initialFocus={initialFocusRef}
        className="overflow-y-auto fixed inset-0"
        open={isOpen}
        onClose={setIsOpen}
        {...props}
      >
        <div className="flex justify-center items-end px-4 pt-4 pb-20 min-h-screen text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <UiDialog.Overlay className="fixed inset-0 z-10 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block relative z-20 px-4 pt-5 pb-4 text-left align-bottom bg-white rounded-lg shadow-xl transition-all sm:p-6 sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              {/* this is where the closed button used to be */}
              {/* this is where the title and input fields used to be */}
              {children}
            </div>
          </Transition.Child>
        </div>
      </UiDialog>
    </Transition.Root>
  );
}

function DismissButton({ children: child }: { children: React.ReactElement }) {
  const { setIsOpen } = useModal();

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(false), child.props.onClick),
  });
}

function OpenButton({ children: child }: { children: React.ReactElement }) {
  const { setIsOpen } = useModal();

  return cloneElement(child, {
    onClick: callAll(() => setIsOpen(true), child.props.onClick),
  });
}

interface ICallBack<Params extends any[]> {
  (...args: Params): void;
}

function callAll<Params extends any[]>(
  ...fns: Array<ICallBack<Params> | undefined>
) {
  return (...args: Params) => {
    fns.forEach((fn) => typeof fn === "function" && fn(...args));
  };
}
