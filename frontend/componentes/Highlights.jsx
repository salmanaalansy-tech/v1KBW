 
import { ShoppingCart, BadgeCheck, Tag, ShieldCheck } from "lucide-react";
function Highlights() {
return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 px-10 text-center">
    
    {/* Card 1 */}
    <div className="flex items-start gap-4 p-5 max-w-md w-full mx-auto bg-white shadow-md rounded-xl hover:shadow-xl transition-all duration-300">
      <ShieldCheck className="text-red-500 w-10 h-10 shrink-0" />
      <div className="text-left">
        <h4 className="font-semibold text-lg">Good Reeding</h4>
        <p className="text-gray-600 text-sm mt-1">We offer a wide selection of books for all ages and interests.</p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="flex items-start gap-4 p-5 max-w-md w-full mx-auto bg-white shadow-md rounded-xl hover:shadow-xl transition-all duration-300">
      <ShoppingCart className="text-red-500 w-10 h-10 shrink-0" />
      <div className="text-left">
        <h4 className="font-semibold text-lg">Easy Shopping</h4>
        <p className="text-gray-600 text-sm mt-1">We make it easy to find and purchase books with our user-friendly interface.</p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="flex items-start gap-4 p-5 max-w-md w-full mx-auto bg-white shadow-md rounded-xl hover:shadow-xl transition-all duration-300">
      <BadgeCheck className="text-red-500 w-10 h-10 shrink-0" />
      <div className="text-left">
        <h4 className="font-semibold text-lg">Quality Assurance</h4>
        <p className="text-gray-600 text-sm mt-1">We ensure all books meet high quality standards before delivery.</p>
      </div>
    </div>

    {/* Card 4 */}
    <div className="flex items-start gap-4 p-5 max-w-md w-full mx-auto bg-white shadow-md rounded-xl hover:shadow-xl transition-all duration-300">
      <Tag className="text-red-500 w-10 h-10 shrink-0" />
      <div className="text-left">
        <h4 className="font-semibold text-lg">Best Price</h4>
        <p className="text-gray-600 text-sm mt-1">We offer competitive prices on all our books to ensure you get the best value.</p>
      </div>
    </div>

  </div>
);

}

export default Highlights;
