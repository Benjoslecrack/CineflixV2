import React from 'react'

export default function Avatar({ src, alt, size }) {
    const avatarSize = {
        small: 'avatar-small',
        medium: 'avatar-medium',
        large: 'avatar-large',
      }[size] || 'avatar-medium';
    return (
        <img
          src={src}
          alt={alt}
          className={`h-[50px] w-[50px] rounded-full`}
        />
      );
}
