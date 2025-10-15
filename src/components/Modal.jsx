import { useEffect, useState, useRef } from "react"
import { createPortal } from "react-dom"
import { getDetals, postPhoto } from '../api/photoServise'

function Modal({ isOpen, onClose, id }) {
    const [data, setData] = useState({comments: []})
    const [comment, setComment] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const cacheRef = useRef({})

    useEffect(() => {
        if (!id) return;

        if (cacheRef.current[id]) {
            setData(cacheRef.current[id]);
            return; 
        }
        const getDetal = async () => {
            setIsLoading(true)
            try {
                const response = await getDetals(id)
                setData({ 
                    ...response, 
                    comments: response.comments || [] 
                });
                cacheRef.current[id] = { 
                    ...response, 
                    comments: response.comments || [] 
                };
            } catch (error) {
                console.error("Error fetching details:", error)
                setData({ comments: [] })
            } finally {
                setIsLoading(false)
            }
        }
        getDetal()
    }, [id])
    

    const submit = async (e) => {
        e.preventDefault()
        if (!comment.trim()) return
        setIsLoading(true)
        try {
            await postPhoto({ comment }, id)
            setComment('')
            const updatedData = await getDetals(id)
            setData(updatedData || { comments: [] })
        } catch (error) {
            console.error("Error posting comment:", error)
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return createPortal(
        <div className="fixed inset-0 bg-[#000000ad] flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-4xl w-8 h-8 font-extrabold flex items-center justify-center cursor-pointer"
                >
                    ×
                </button>
                <div className="overflow-y-auto max-h-[90vh]">
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            <div className="p-6 pb-4">
                                <img 
                                    className="w-full h-auto rounded-lg shadow-md max-h-96 object-contain"
                                    src={data.largeImage} 
                                    alt="Large view" 
                                />
                            </div>
                            <div className="px-6 pb-6">
                                <h3 className="font-semibold text-lg text-gray-800 mb-4">
                                    Comments ({data.comments?.length || 0})
                                </h3>
                                
                                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                                    {data.comments && data.comments.length > 0 ? (
                                        data.comments.map(el => (
                                            <div key={el.id}>
                                                <div className="flex items-start gap-2">
                                                    <span className="font-semibold min-w-20">
                                                        {el.author}:
                                                    </span>
                                                    <p className="text-gray-700 flex-1">{el.text}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">
                                            No comments!
                                        </p>
                                    )}
                                </div>
                                <form onSubmit={submit} className="flex gap-3">
                                    <input 
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                                        type="text" 
                                        placeholder="Write your comment..."
                                        onChange={(e) => setComment(e.target.value)}
                                        value={comment}
                                        disabled={isLoading}
                                        required
                                    />
                                    <button
                                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed min-w-20"
                                        type="submit"
                                        disabled={isLoading || !comment.trim()}
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                                        ) : (
                                            "Post"
                                        )}
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>,
        document.body
    )
}

export default Modal