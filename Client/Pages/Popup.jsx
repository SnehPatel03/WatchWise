import React from 'react';
import { CircleX, Star, Calendar, Globe } from 'lucide-react';

const Popup = ({ movie, onClose }) => {
    if (!movie) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-full h-[90vh] sm:h-[7  0vh] max-w-4xl bg-[#1b1b1b] rounded-2xl shadow-2xl overflow-auto sm:overflow-hidden animate-in fade-in zoom-in duration-300"
            >
                <div className="flex flex-col md:flex-row p-8 gap-8">
                    <div className="flex-shrink-0">
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-64 h-96 object-cover rounded-xl shadow-lg"
                        />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="mb-4">
                            <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
                            <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-400">{movie.type?.toUpperCase()}</span>
                                <div className="flex items-center gap-1">
                                    <Star size={16} className="fill-[#F5C518] text-[#F5C518]" />
                                    <span className="text-[#F5C518] font-semibold">{movie.rating}</span>
                                    <span className="text-gray-400">/10</span>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-[#F5C518] text-lg font-semibold mb-2">About the Movie</h2>
                            <p className="text-gray-300 leading-relaxed">{movie.plot}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-[#F5C518] font-semibold mb-2">Release Date</h3>
                                <div className="flex items-center gap-2 text-gray-300">
                                    <Calendar size={16} />
                                    <span>{movie.releaseDate}</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[#F5C518] font-semibold mb-2">Year</h3>
                                <p className="text-gray-300">{movie.year}</p>
                            </div>

                            <div className="col-span-2">
                                <h3 className="text-[#F5C518] font-semibold mb-2">Languages</h3>
                                <div className="flex items-start gap-2">
                                    <Globe size={16} className="text-gray-400 mt-1 flex-shrink-0" />
                                    <p className="text-gray-300">{movie.language}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Popup;