import avatar from '../img/avatar.jpg';
import message from '../img/mail.svg';
import call from '../img/phone.svg';

function Header() {
    return (
        <div className="w-full h-48 bg-cover bg-center bg-[url(/home/prog/Desktop/task-delta/src/img/header.jpg)]">
            <div className='flex justify-between items-end px-8 pt-38 max-w-5xl mx-auto my-0'>
                <div className='flex gap-5 items-end'>
                    <img 
                        className="w-32 h-32 rounded-full border-4 border-white shadow-lg" 
                        src={avatar} 
                        alt="avatar" 
                    />
                    <h2 className='font-medium text-2xl text-black mb-4'>Ricardo Cooper</h2>
                </div>
                <div className='flex gap-4 items-end mb-4'>
                    <button className='flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-2xl'>
                        <img src={message} alt="message" className="w-5 h-5" />
                        <span className='text-gray-700 font-medium'>Message</span>
                    </button>
                    <button className='flex items-center gap-2 px-4 py-3 bg-white border border-gray-300 rounded-2xl'>
                        <img src={call} alt="call" className="w-5 h-5" />
                        <span className='text-gray-700 font-medium'>Call</span>
                    </button>           
                </div>
            </div>
        </div>
    );
}

export default Header;