"use client";

import React from "react";

interface NextButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}

export default function NextButtonStep({ onClick, disabled }: NextButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      disabled={disabled}
    >
      Continue
    </button>
  );
}
