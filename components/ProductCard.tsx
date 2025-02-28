interface ProductCardProps {
    product: {
      name: string;
      emissionFactor: number;
    };
  }
  
  export default function ProductCard({ product }: ProductCardProps) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-5">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Emission Factor:</span>
            <span className="text-lg font-bold text-blue-700">{product.emissionFactor.toFixed(2)}</span>
          </div>
        </div>
        <div className="bg-gray-50 px-5 py-3 border-t">
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    );
  }