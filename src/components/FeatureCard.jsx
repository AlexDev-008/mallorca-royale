import React from 'react';

export function FeatureCard({title, description, icon}) {
    return (
        <>
            <article className="bg-white m-5 p-5 rounded-4 position-relative">
                <span className="position-absolute p-2 px-3 rounded-3 shadow"
                      style={{top:"-20px", backgroundColor: "#212121"}}
                >
                    <i className={`bi bi-${icon} fs-2 w-100 h-100 text-light`}></i>
                </span>
                <h2 className="m-0 mt-4 fw-bold fs-3">
                    {title}
                </h2>
                <p className="mt-3">
                    {description}
                </p>
            </article>
        </>
    );
}