import React, { useState, useRef } from "react";
import { FiSearch, FiPlus, FiMinus, FiTrash2, FiPrinter, FiLogOut, FiX, FiBarChart2 } from "react-icons/fi";
import { FaMoneyBillWave, FaCreditCard, FaQrcode, FaUtensils, FaCoffee, FaBreadSlice } from "react-icons/fa";

interface Product {
  id: number;
  name: string;
  category: "Coffee" | "Bread";
  price: number;
  image: string;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Sale {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: "Cash" | "Card" | "Digital";
  date: string;
}

const productsData: Product[] = [
    { id: 1, name: "Espresso", category: "Coffee", price: 90, image: "/Espresso.png", description: "A concentrated coffee beverage brewed by forcing a small amount of nearly boiling water under pressure through finely-ground coffee beans." },
    { id: 2, name: "Americano", category: "Coffee", price: 100, image: "/hot americano.png", description: "A classic coffee drink made by diluting an espresso with hot water, giving it a similar strength to, but different flavor from, traditionally brewed coffee." },
    { id: 3, name: "Cappuccino", category: "Coffee", price: 120, image: "/CAPPUCCINO.png", description: "An espresso-based coffee drink that originated in Italy, prepared with steamed milk foam. The perfect balance of coffee and milk." },
    { id: 4, name: "Latte", category: "Coffee", price: 130, image: "/Hot Latte.png", description: "A coffee drink made with espresso and steamed milk, creamier than a cappuccino." },
    { id: 5, name: "Flat White", category: "Coffee", price: 135, image: "/Hot Flat White.png", description: "An espresso-based coffee drink with steamed milk, originating from Australia and New Zealand. It is similar to a latte but with a higher proportion of coffee to milk." },
    { id: 6, name: "Mocha", category: "Coffee", price: 140, image: "/Hot Mocha.png", description: "A delicious blend of espresso, steamed milk, and chocolate syrup, topped with whipped cream." },
    { id: 7, name: "Caramel Macchiato", category: "Coffee", price: 150, image: "/Hot Caramel Macchiato.png", description: "A sweet and creamy coffee drink with layers of steamed milk, vanilla syrup, espresso, and a drizzle of caramel sauce." },
    { id: 8, name: "Spanish Latte", category: "Coffee", price: 160, image: "/Hot Spanish Latte.png", description: "A delightful coffee drink made with espresso, steamed milk, and sweetened condensed milk for a rich, creamy texture." },
    { id: 9, name: "Hazelnut Latte", category: "Coffee", price: 150, image: "/Hot Hazelnut Latte.png", description: "A classic latte with a nutty twist. Espresso, steamed milk, and hazelnut syrup." },
    { id: 10, name: "Vanilla Latte", category: "Coffee", price: 150, image: "/Hot Vanilla Latte.png", description: "A smooth and creamy latte flavored with sweet vanilla syrup." },
    { id: 11, name: "Cold Brew", category: "Coffee", price: 120, image: "/Cold Brew.png", description: "Coffee steeped in cold water for an extended period, resulting in a smooth, low-acid, and highly caffeinated coffee concentrate." },
    { id: 12, name: "Iced Americano", category: "Coffee", price: 110, image: "/Iced Americano.png", description: "Espresso shots topped with cold water and served over ice. A refreshing and bold coffee experience." },
    { id: 13, name: "Iced Latte", category: "Coffee", price: 130, image: "/Iced Latte.png", description: "A chilled coffee drink made with espresso, cold milk, and served over ice." },
    { id: 14, name: "Iced Caramel Macchiato", category: "Coffee", price: 140, image: "/Iced White Mochs.png", description: "A cold version of the classic, with layers of vanilla syrup, cold milk, espresso, and caramel drizzle over ice." },
    { id: 15, name: "Iced White Mocha", category: "Coffee", price: 155, image: "/Iced Caramel Macchiato.png", description: "A sweet and creamy iced coffee drink made with espresso, milk, and white chocolate sauce." },
    { id: 16, name: "Iced Matcha Latte", category: "Coffee", price: 160, image: "/Iced Matcha Latte.png", description: "A refreshing blend of finely ground green tea powder, milk, and a sweetener, served over ice." },
    { id: 17, name: "Ensaymada", category: "Bread", price: 35, image: "/BREAD.png", description: "A soft, sweet brioche pastry covered with butter, sugar, and grated cheese. A Filipino classic." },
    { id: 18, name: "Spanish Bread", category: "Bread", price: 20, image: "/Spanish Bread (1).png", description: "A soft bread roll with a sweet, buttery filling, rolled in breadcrumbs before baking." },
    { id: 19, name: "Cheese Roll", category: "Bread", price: 25, image: "/Cheese Roll.png", description: "A soft, fluffy bread roll with a savory cheese filling, often topped with more cheese." },
    { id: 20, name: "Croissant", category: "Bread", price: 55, image: "/Croissant.png", description: "A buttery, flaky, and crescent-shaped pastry of Austrian origin, named for its historical crescent shape." },
    { id: 21, name: "Chocolate Croissant", category: "Bread", price: 65, image: "/Choco Croissant.png", description: "A classic croissant with a piece of dark chocolate baked inside." },
    { id: 22, name: "Cinnamon Roll", category: "Bread", price: 85, image: "/Cinammon Roll.png", description: "A sweet baked dough filled with a cinnamon-sugar mixture, often topped with a cream cheese frosting." },
    { id: 23, name: "Banana Bread Slice", category: "Bread", price: 45, image: "/Banana Bread Slice.png", description: "A moist and sweet cake-like bread made from mashed bananas." },
    { id: 24, name: "Chocolate Chip Cookie", category: "Bread", price: 40, image: "/COOKIES.png", description: "A classic cookie with a soft and chewy texture, loaded with semi-sweet chocolate chips." },
    { id: 25, name: "Double Chocolate Cookie", category: "Bread", price: 45, image: "/choco cookie.png", description: "A rich, chocolate-based cookie packed with even more chocolate chips for the ultimate chocolate lover." },
    { id: 26, name: "Oatmeal Raisin Cookie", category: "Bread", price: 35, image: "/Oatmeal Raisin Cookie.png", description: "A chewy cookie made with rolled oats, sweet raisins, and a hint of cinnamon." },
    { id: 27, name: "Peanut Butter Cookie", category: "Bread", price: 40, image: "/Peanut Butter Cookie.png", description: "A soft and crumbly cookie with a rich peanut butter flavor, often with a criss-cross pattern on top." },
    { id: 28, name: "White Chocolate Macadamia Cookie", category: "Bread", price: 50, image: "/white cookie.png", description: "A delicious cookie loaded with creamy white chocolate chunks and crunchy macadamia nuts." },
];

interface SidebarProps {
  onShowSalesReport: () => void;
  onShowReceipt: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onShowSalesReport, onShowReceipt }) => (
    <div className="w-20 bg-[#3D2C1D] text-white flex flex-col justify-between items-center py-6">
      <div className="flex flex-col items-center space-y-4">
        <a href="#" className="p-3 bg-[#8C5A3A] rounded-lg hover:bg-[#6F4E37] transition-colors">
          <img src="/logo.png" alt="Logo" className="w-6 h-6" />
        </a>
        
        <button 
          onClick={onShowSalesReport}
          title="Sales Report"
          className="p-3 rounded-lg hover:bg-[#6F4E37] transition-colors"
        >
          <FiBarChart2 size={20} />
        </button>

        {/* Print Last Receipt Button */}
        <button 
          onClick={onShowReceipt}
          title="Print Last Receipt"
          className="p-3 rounded-lg hover:bg-[#6F4E37] transition-colors"
        >
          <FiPrinter size={20} />
        </button>
      </div>
  
      {/* Logout (at the bottom) */}
      <a href="#" className="p-3 rounded-lg hover:bg-[#6F4E37] transition-colors">
        <FiLogOut size={20} />
      </a>
    </div>
  );
  
const Pos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Menu");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [taxRate] = useState(0.12); // 12%
  const [paymentMethod, setPaymentMethod] = useState<"Cash" | "Card" | "Digital">("Cash");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [latestReceipt, setLatestReceipt] = useState<Sale | null>(null);
  const [salesHistory, setSalesHistory] = useState<Sale[]>([]); // To store all sales
  const [showSalesReportModal, setShowSalesReportModal] = useState(false); // To toggle sales modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  
  const receiptRef = useRef<HTMLDivElement>(null);

  const categories = [
    { name: "All Menu", icon: <FaUtensils size={24} /> },
    { name: "Coffee", icon: <FaCoffee size={24} /> },
    { name: "Bread", icon: <FaBreadSlice size={24} /> },
  ];

  const getProductCount = (categoryName: string) => {
    if (categoryName === "All Menu") {
        return productsData.length;
    }
    return productsData.filter(p => p.category === categoryName).length;
  }

  const filteredProducts = productsData
    .filter((product) =>
        selectedCategory === "All Menu" ? true : product.category === selectedCategory
    )
    .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const addToCart = (product: Product, quantity: number) => {
    if (!product) return;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId: number, amount: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setModalQuantity(1);
    setShowProductModal(true);
  };

  const handleAddToCartFromModal = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, modalQuantity);
      setShowProductModal(false);
    }
  };


  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * taxRate;
  const total = subtotal - discount + tax;

  const handleProcessOrder = () => {
    if (cart.length > 0) {
      setShowPaymentModal(true);
    }
  };

  const handlePayment = () => {
    const newSale: Sale = {
      id: new Date().toISOString(),
      items: cart,
      subtotal,
      discount,
      tax,
      total,
      paymentMethod,
      date: new Date().toLocaleString(),
    };

    setLatestReceipt(newSale);
    setSalesHistory(prevHistory => [...prevHistory, newSale]); // Add sale to history
    setShowPaymentModal(false);
    setShowReceiptModal(true);
    setCart([]);
    setDiscount(0);
  };
  
  // Handler for sidebar button to show last receipt
  const handleShowLastReceipt = () => {
    if (latestReceipt) {
        setShowReceiptModal(true);
    } else {
        alert("No receipt from the last transaction is available.");
    }
  };


  const handlePrintReceipt = () => {
    const printContent = receiptRef.current?.innerHTML;
    const printWindow = window.open("", "Print", "width=600,height=800");

    if (printWindow && printContent) {
      printWindow.document.write('<html><head><title>Print Receipt</title>');
      printWindow.document.write(`
        <style>
          body { font-family: 'Courier New', Courier, monospace; color: #3D2C1D; margin: 20px; }
          h2 { text-align: center; }
          p { text-align: center; }
          .details { border-top: 1px dashed #D6C7B7; border-bottom: 1px dashed #D6C7B7; padding: 10px 0; margin: 10px 0; }
          .item, .summary-item { display: flex; justify-content: space-between; margin-bottom: 5px; }
          .total { font-weight: bold; font-size: 1.2em; border-top: 1px solid #D6C7B7; padding-top: 5px; }
          .footer { text-align: center; margin-top: 20px; font-weight: bold; }
        </style>
      `);
      printWindow.document.write('</head><body>');
      printWindow.document.write(printContent);
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.focus();
      printWindow.print(); // This opens the print dialog
      printWindow.close();
    }
  };

  return (
    <div className="h-screen bg-[#F5F0E6] flex overflow-hidden">
    <Sidebar 
        onShowSalesReport={() => setShowSalesReportModal(true)} 
        onShowReceipt={handleShowLastReceipt} 
    />
    <main className="flex-1 p-6 h-full">
      <div className="flex space-x-6 h-full">
          {/* Left Side - Products */}
          <div className="w-2/3 h-full">
            <div className="bg-[#FFFBF5] p-6 rounded-lg shadow-md h-full flex flex-col">
              {/* Search */}
              <div className="relative mb-6">
                <FiSearch className="absolute top-3.5 left-4 text-[#A98C76]" />
                <input
                  type="text"
                  placeholder="Search for coffee or bread..."
                  className="pl-12 p-3 border border-[#D6C7B7] rounded-lg w-full focus:ring-2 focus:ring-[#8C5A3A] transition bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#3D2C1D] mb-4">Categories</h3>
                <div className="flex space-x-4">
                {categories.map((category) => (
                    <div
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all duration-200 cursor-pointer w-32 h-24 text-center ${
                        selectedCategory === category.name
                        ? 'bg-[#EAE1D5] text-[#8C5A3A] ring-2 ring-[#8C5A3A]'
                        : 'bg-[#FFFBF5] border border-[#D6C7B7] text-[#6F4E37] hover:shadow-md'
                    }`}
                    >
                    <div className="mb-2">{category.icon}</div>
                    <p className="font-semibold text-sm">{category.name}</p>
                    <p className="text-xs text-[#8C5A3A]">
                        {getProductCount(category.name)} items
                    </p>
                    </div>
                ))}
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto pr-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border border-[#D6C7B7] p-4 rounded-xl text-center cursor-pointer hover:shadow-lg hover:scale-105 transition-transform bg-[#FFFBF5]"
                    onClick={() => handleProductClick(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-28 object-cover mb-3 rounded-lg"
                    />
                    <h3 className="font-semibold text-[#3D2C1D]">{product.name}</h3>
                    <p className="text-[#8C5A3A] font-bold">₱{product.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        <div className="w-1/3 flex flex-col">
          <div className="bg-[#FFFBF5] p-6 rounded-lg shadow-md flex flex-col h-full">
              <h2 className="text-2xl font-bold mb-4 border-b border-[#D6C7B7] pb-3 text-[#3D2C1D]">Your Order</h2>
              <div className="flex-grow overflow-y-auto pr-2">
                {cart.length === 0 ? (
                <p className="text-[#8C5A3A] text-center mt-12">Your cart is empty.</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center mb-4 p-2 rounded-lg hover:bg-[#F5F0E6]">
                      <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="w-12 h-12 rounded-md object-cover mr-4" />
                        <div>
                        <p className="font-semibold text-[#3D2C1D]">{item.name}</p>
                        <p className="text-sm text-[#8C5A3A]">₱{item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-[#3D2C1D]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 bg-[#EAE1D5] rounded-full hover:bg-[#D6C7B7] transition"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="mx-3 font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 bg-[#EAE1D5] rounded-full hover:bg-[#D6C7B7] transition"
                        >
                          <FiPlus size={12} />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-4 text-[#C4664F] hover:text-[#A84A32] transition"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Summary */}
              <div className="border-t-2 border-[#D6C7B7] pt-4 mt-auto text-[#6F4E37]">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span>Discount</span>
                  <input
                    type="number"
                    className="w-24 p-1 border border-[#D6C7B7] rounded-md text-right bg-transparent"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax ({(taxRate * 100).toFixed(0)}%)</span>
                  <span>₱{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-2xl mt-4 text-[#3D2C1D]">
                  <span>Total</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleProcessOrder}
                  className="w-full bg-[#8C5A3A] text-white p-3 rounded-lg mt-4 font-bold hover:bg-[#6F4E37] transition disabled:bg-[#D6C7B7]"
                  disabled={cart.length === 0}
                >
                  Process Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-[#3D2C1D] bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-[#FFFBF5] p-6 rounded-lg shadow-xl w-full max-w-lg animate-fadeIn relative">
            <button
              onClick={() => setShowProductModal(false)}
              className="absolute top-4 right-4 text-[#8C5A3A] hover:text-[#3D2C1D]"
            >
              <FiX size={24} />
            </button>
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full md:w-1/2 h-64 object-cover rounded-lg"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-[#3D2C1D]">{selectedProduct.name}</h2>
                  <p className="text-2xl font-semibold text-[#8C5A3A] my-3">
                    ₱{selectedProduct.price.toFixed(2)}
                  </p>
                  <p className="text-[#6F4E37] text-sm mb-4">{selectedProduct.description}</p>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center border border-[#D6C7B7] rounded-lg">
                    <button
                      onClick={() => setModalQuantity(q => Math.max(1, q - 1))}
                      className="p-3 rounded-l-lg hover:bg-[#EAE1D5] transition text-[#3D2C1D]"
                    >
                      <FiMinus />
                    </button>
                    <span className="px-5 font-semibold text-lg text-[#3D2C1D]">{modalQuantity}</span>
                    <button
                      onClick={() => setModalQuantity(q => q + 1)}
                      className="p-3 rounded-r-lg hover:bg-[#EAE1D5] transition text-[#3D2C1D]"
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCartFromModal}
                    className="flex-1 bg-[#8C5A3A] text-white p-3 rounded-lg font-semibold hover:bg-[#6F4E37] transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPaymentModal && (
        <div className="fixed inset-0 bg-[#3D2C1D] bg-opacity-70 flex justify-center items-center">
        <div className="bg-[#FFFBF5] p-8 rounded-lg shadow-xl w-full max-w-md animate-fadeIn">
            <h2 className="text-3xl font-bold mb-6 text-center text-[#3D2C1D]">Payment</h2>
            <div className="flex justify-between items-center font-bold text-4xl mb-8 p-4 bg-[#F5F0E6] rounded-lg">
              <span className="text-[#6F4E37]">Total:</span>
              <span className="text-[#8C5A3A]">₱{total.toFixed(2)}</span>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-[#3D2C1D]">Select Payment Method:</h3>
              <div className="grid grid-cols-3 gap-4 text-[#6F4E37]">
                <button
                  onClick={() => setPaymentMethod("Cash")}
                  className={`flex flex-col items-center p-4 border-2 rounded-lg transition ${
                    paymentMethod === "Cash" ? "border-[#8C5A3A] bg-[#F5F0E6]" : "border-[#D6C7B7] hover:bg-[#F5F0E6]"
                  }`}
                >
                  <FaMoneyBillWave size={40} className={`mb-2 ${paymentMethod === 'Cash' ? 'text-[#8C5A3A]' : 'text-[#A98C76]'}`} />
                  <span className="font-semibold">Cash</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("Card")}
                  className={`flex flex-col items-center p-4 border-2 rounded-lg transition ${
                    paymentMethod === "Card" ? "border-[#8C5A3A] bg-[#F5F0E6]" : "border-[#D6C7B7] hover:bg-[#F5F0E6]"
                  }`}
                >
                  <FaCreditCard size={40} className={`mb-2 ${paymentMethod === 'Card' ? 'text-[#8C5A3A]' : 'text-[#A98C76]'}`} />
                  <span className="font-semibold">Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod("Digital")}
                  className={`flex flex-col items-center p-4 border-2 rounded-lg transition ${
                    paymentMethod === "Digital" ? "border-[#8C5A3A] bg-[#F5F0E6]" : "border-[#D6C7B7] hover:bg-[#F5F0E6]"
                  }`}
                >
                  <FaQrcode size={40} className={`mb-2 ${paymentMethod === 'Digital' ? 'text-[#8C5A3A]' : 'text-[#A98C76]'}`} />
                  <span className="font-semibold">Digital</span>
                </button>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-10">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-6 py-3 bg-[#EAE1D5] text-[#3D2C1D] rounded-lg font-semibold hover:bg-[#D6C7B7] transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="px-6 py-3 bg-[#8C5A3A] text-white rounded-lg font-semibold hover:bg-[#6F4E37] transition"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {showReceiptModal && latestReceipt && (
        <div className="fixed inset-0 bg-[#3D2C1D] bg-opacity-70 flex justify-center items-center">
        <div className="bg-[#FFFBF5] p-8 rounded-lg shadow-xl w-full max-w-sm animate-fadeIn">
            <div ref={receiptRef} className="text-sm text-[#3D2C1D]">
              <h2 className="text-2xl font-bold mb-4 text-center">Receipt</h2>
              <p className="text-center mb-2">Thank you for your purchase!</p>
              <p className="text-center text-xs mb-4 text-[#8C5A3A]">{latestReceipt.date}</p>
              <div className="border-t border-b border-dashed border-[#D6C7B7] py-3 my-3">
                {latestReceipt.items.map((item) => (
                  <div key={item.id} className="flex justify-between mb-1">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-1 text-[#6F4E37]">
                <div className="flex justify-between">
                  <span>Subtotal:</span> <span>₱{latestReceipt.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>{" "}
                  <span>- ₱{latestReceipt.discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax:</span> <span>₱{latestReceipt.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg mt-2 border-t border-[#D6C7B7] pt-2 text-[#3D2C1D]">
                  <span>Total:</span> <span>₱{latestReceipt.total.toFixed(2)}</span>
                </div>
              </div>
              <p className="mt-6 text-center font-semibold">
                Paid with: {latestReceipt.paymentMethod}
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-8">
              {/* The print button */}
              <button
                onClick={handlePrintReceipt}
                className="flex items-center px-6 py-2 bg-[#EAE1D5] text-[#3D2C1D] rounded-lg font-semibold hover:bg-[#D6C7B7] transition"
              >
                <FiPrinter className="mr-2" /> Print
              </button>
              <button
                onClick={() => setShowReceiptModal(false)}
                className="px-6 py-2 bg-[#8C5A3A] text-white rounded-lg font-semibold hover:bg-[#6F4E37] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showSalesReportModal && (
        <div className="fixed inset-0 bg-[#3D2C1D] bg-opacity-70 flex justify-center items-center z-50">
            <div className="bg-[#FFFBF5] p-8 rounded-lg shadow-xl w-full max-w-2xl animate-fadeIn flex flex-col h-[80vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-3xl font-bold text-[#3D2C1D]">Sales History</h2>
                    <button
                        onClick={() => setShowSalesReportModal(false)}
                        className="text-[#8C5A3A] hover:text-[#3D2C1D]"
                    >
                        <FiX size={24} />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto pr-4 border-t border-b border-[#D6C7B7] py-4">
                    {salesHistory.length === 0 ? (
                        <p className="text-center text-[#8C5A3A] mt-10">No sales recorded yet.</p>
                    ) : (
                        <table className="w-full text-left text-[#6F4E37]">
                            <thead className="border-b border-[#D6C7B7]">
                                <tr>
                                    <th className="p-2">Date</th>
                                    <th className="p-2">Items</th>
                                    <th className="p-2">Payment Method</th>
                                    <th className="p-2 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salesHistory.map((sale) => (
                                    <tr key={sale.id} className="border-b border-[#EAE1D5] hover:bg-[#F5F0E6]">
                                        <td className="p-2">{sale.date}</td>
                                        <td className="p-2">{sale.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                                        <td className="p-2">{sale.paymentMethod}</td>
                                        <td className="p-2 text-right font-semibold text-[#3D2C1D]">₱{sale.total.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => setShowSalesReportModal(false)}
                        className="px-6 py-3 bg-[#8C5A3A] text-white rounded-lg font-semibold hover:bg-[#6F4E37] transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default Pos;