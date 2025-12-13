 
import { ShoppingCart, BadgeCheck, Tag, ShieldCheck } from "lucide-react";
function Highlights() {
return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 px-10 text-center">
    
    {/* Card 1 */}
    <div className="flex items-start gap-4 p-5 max-w-md w-full mx-auto bg-white shadow-md rounded-xl hover:shadow-xl transition-all duration-300">
      <ShieldCheck className="text-red-500 w-10 h-10 shrink-0" />
      <div className="text-left">
        <h4 className="font-semibold text-lg">ssssssssss</h4>
        <p className="text-gray-600 text-sm mt-1">jjjjjjjjjjjjjjjjj</p>
      </div>
    </div>

    {/* Card 2 */}
    <div className="flex items-start gap-4 p-5 max-w-md w-full mx-auto bg-white shadow-md rounded-xl hover:shadow-xl transition-all duration-300">
      <ShoppingCart className="text-red-500 w-10 h-10 shrink-0" />
      <div className="text-left">
        <h4 className="font-semibold text-lg">ssssssssss</h4>
        <p className="text-gray-600 text-sm mt-1">jjjjjjjjjjjjjjjjj</p>
      </div>
    </div>

    {/* Card 3 */}
    <div className="flex items-start gap-4 p-5 max-w-md w-full mx-auto bg-white shadow-md rounded-xl hover:shadow-xl transition-all duration-300">
      <BadgeCheck className="text-red-500 w-10 h-10 shrink-0" />
      <div className="text-left">
        <h4 className="font-semibold text-lg">ssssssssss</h4>
        <p className="text-gray-600 text-sm mt-1">jjjjjjjjjjjjjjjjj</p>
      </div>
    </div>

    {/* Card 4 */}
    <div className="flex items-start gap-4 p-5 max-w-md w-full mx-auto bg-white shadow-md rounded-xl hover:shadow-xl transition-all duration-300">
      <Tag className="text-red-500 w-10 h-10 shrink-0" />
      <div className="text-left">
        <h4 className="font-semibold text-lg">ssssssssss</h4>
        <p className="text-gray-600 text-sm mt-1">jjjjjjjjjjjjjjjjj</p>
      </div>
    </div>

  </div>
);

}

export default Highlights;
