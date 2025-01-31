"use client";

import { Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

interface MiniCartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MiniCart = ({ isOpen, setIsOpen }: MiniCartProps) => {
  const { items, removeItem, updateQuantity, getTotal } = useCart();
  const total = getTotal();

  if (!isOpen) return null;

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-50 overflow-y-auto"
      onClose={setIsOpen}
      open={isOpen}
    >
      <div className="min-h-screen text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="w-screen max-w-md">
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <Dialog.Title className="text-lg font-medium text-gray-900">
                    Shopping cart
                  </Dialog.Title>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {items.map((item) => (
                        <li
                          key={`${item.id}-${item.color}-${item.size}`}
                          className="flex py-6"
                        >
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <Link
                                    href={`/product/${item.id}`}
                                    className="hover:text-gray-700"
                                  >
                                    {item.name}
                                  </Link>
                                </h3>
                                <p className="ml-4">${item.price.toFixed(2)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500 text-left">
                                {item.color} | {item.size}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="flex items-center">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.color,
                                      item.size,
                                      Math.max(0, item.quantity - 1)
                                    )
                                  }
                                  className="text-gray-500 hover:text-gray-700 p-1"
                                >
                                  -
                                </button>
                                <span className="mx-2 text-gray-700">
                                  Qty {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.color,
                                      item.size,
                                      item.quantity + 1
                                    )
                                  }
                                  className="text-gray-500 hover:text-gray-700 p-1"
                                >
                                  +
                                </button>
                              </div>

                              <div className="flex">
                                <button
                                  type="button"
                                  onClick={() =>
                                    removeItem(item.id, item.color, item.size)
                                  }
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${total.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Link
                    href="/cart"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Checkout
                  </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{" "}
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => setIsOpen(false)}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default MiniCart;
