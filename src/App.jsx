import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2, Download, Building, FileText, Upload, Car } from 'lucide-react';
import { format } from 'date-fns';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const AUTO_PARTS = [
  "Engine Oil", "Gear Oil", "Differential Oil", "Transmission Oil", "Brake Oil / Brake Fluid", "Coolant", "Power Steering Oil", "Clutch Oil", "Oil Filter", "Air Filter", "Fuel Filter", "Cabin / AC Filter", "Spark Plug", "Glow Plug", "Engine Oil Additive", "Fuel Additive", "Radiator Flush", "Engine Flush", "Injector Cleaner", 
  "Timing Belt", "Timing Chain", "Timing Belt Tensioner", "Timing Chain Tensioner", "Idler Pulley", "Serpentine Belt", "V Belt", "Water Pump", "Thermostat", "Radiator", "Radiator Fan", "Radiator Fan Motor", "Radiator Hose", "Coolant Reservoir", "Engine Mount", "Valve Cover Gasket", "Head Gasket", "Intake Manifold Gasket", "Exhaust Manifold Gasket", "Oil Pan Gasket", "Crankshaft Oil Seal", "Camshaft Oil Seal", "Piston", "Piston Ring", "Connecting Rod", "Crankshaft", "Camshaft", "Engine Bearing", "Cylinder Head", "Engine Block", "Rocker Arm", "Valve", "Valve Seal", "Hydraulic Lifter", "Injector", "Injector O-Ring", "Throttle Body", "EGR Valve", "PCV Valve", "Turbocharger", "Intercooler", "Turbo Hose", 
  "Front Brake Pad", "Rear Brake Pad", "Brake Disc", "Brake Rotor", "Brake Drum", "Brake Shoe", "Brake Caliper", "Caliper Repair Kit", "Brake Master Cylinder", "Brake Wheel Cylinder", "Brake Booster", "Brake Hose", "Brake Pipe", "Brake Fluid", "ABS Sensor", "ABS Module", "Hand Brake Cable", "Hand Brake Lever", "Brake Pad Wear Sensor", 
  "Front Shock Absorber", "Rear Shock Absorber", "Front Strut", "Rear Strut", "Coil Spring", "Leaf Spring", "Control Arm", "Lower Arm", "Upper Arm", "Ball Joint", "Stabilizer Link", "Stabilizer Bush", "Control Arm Bush", "Strut Mount", "Strut Bearing", "Suspension Bush Kit", "Wheel Bearing", "Hub Assembly", "Wheel Hub", 
  "Steering Rack", "Steering Rack End", "Tie Rod End", "Tie Rod", "Steering Column", "Steering Knuckle", "Power Steering Pump", "Power Steering Hose", "Power Steering Belt", "Steering Rack Boot", "Steering Wheel", "Steering Fluid", 
  "Clutch Plate", "Clutch Cover", "Pressure Plate", "Clutch Release Bearing", "Clutch Master Cylinder", "Clutch Slave Cylinder", "Clutch Cable", "Flywheel", "Flywheel Bearing", "Gearbox Mount", "Transmission Filter", "Gear Selector Cable", "Gear Lever", "Drive Shaft", "Propeller Shaft", "CV Joint", "CV Joint Boot", "Differential Bearing", 
  "Battery", "Alternator", "Starter Motor", "Starter Solenoid", "Ignition Coil", "Spark Plug Wire", "Fuse", "Relay", "Horn", "Headlight Bulb", "Tail Light Bulb", "Brake Light Bulb", "Indicator Bulb", "Fog Light Bulb", "Number Plate Bulb", "Headlight Assembly", "Tail Light Assembly", "Indicator Assembly", "Wiper Motor", "Wiper Blade", "Wiper Arm", "Wiper Linkage", "Battery Terminal", "Battery Cable", "Wiring Harness", "Electrical Connector", "ECU", "BCM", "Immobilizer", "Key Battery", 
  "Oxygen Sensor", "Crankshaft Sensor", "Camshaft Sensor", "MAP Sensor", "MAF Sensor", "Throttle Position Sensor", "Coolant Temperature Sensor", "Oil Pressure Sensor", "Fuel Pressure Sensor", "Wheel Speed Sensor", "Knock Sensor", "Parking Sensor", "Reverse Sensor", "TPMS Sensor", "Air Temperature Sensor", 
  "AC Compressor", "AC Condenser", "AC Evaporator", "AC Expansion Valve", "AC Filter", "AC Blower Motor", "AC Blower Resistor", "AC Pressure Sensor", "AC Hose", "AC Belt", "AC Gas", "AC Gas Charging", "AC Compressor Oil", 
  "Fuel Pump", "Fuel Tank", "Fuel Injector", "Fuel Rail", "Fuel Pressure Regulator", "Fuel Hose", "Fuel Tank Cap", "Carburetor", "Diesel Injector", "Diesel Injection Pump", "Fuel Pump Relay", 
  "Exhaust Pipe", "Exhaust Manifold", "Catalytic Converter", "Silencer", "Muffler", "Resonator", "Exhaust Gasket", "Exhaust Hanger", "DPF", "DPF Cleaning", "EGR Cooler", 
  "Car Tyre", "Tubeless Tyre", "Wheel Rim", "Alloy Wheel", "Wheel Cap", "Wheel Nut", "Wheel Bolt", "Wheel Stud", "Tyre Valve", "TPMS Valve", "Wheel Balancing", "Wheel Alignment", "Tyre Rotation", "Puncture Repair", 
  "Front Bumper", "Rear Bumper", "Bonnet", "Boot Lid", "Front Fender", "Rear Fender", "Front Door", "Rear Door", "Door Handle", "Door Lock", "Door Hinge", "Side Mirror", "Rear View Mirror", "Front Grille", "Headlight", "Tail Light", "Fog Light", "Mud Flap", "Fender Liner", "Splash Guard", "Windscreen", "Rear Glass", "Door Glass", "Window Regulator", "Window Motor", "Bonnet Cable", "Boot Cable", "Bonnet Gas Strut", "Boot Gas Strut", 
  "Seat Cover", "Floor Mat", "Dashboard", "Dashboard Panel", "Door Pad", "Door Trim", "Roof Liner", "Sun Visor", "Seat Belt", "Seat Belt Buckle", "Interior Light", "Cabin Light", "Door Switch", "Power Window Switch", "AC Control Panel", "Infotainment System", "Speakers", "Reverse Camera", "USB Charger"
];

const DEFAULT_COMPANY = {
  id: uuidv4(),
  name: 'SR CARS SALES & SERVICE',
  email: 'samrajcars@gmail.com',
  address: 'Kamaraj Nagar, Avadi,\nChennai - 600071',
  phone: '8610362451',
  website: 'srcars.vercel.app',
  logo: ''
};

const DEFAULT_INVOICE = {
  date: format(new Date(), 'yyyy-MM-dd'),
  clientName: 'Sharan',
  clientPhone: '7448429076',
  
  vehicleModel: 'Figo 1.4 TDCi EXI',
  vehicleRegNo: 'TN37BH8812',
  vehicleFuel: 'Diesel',

  items: [
    { id: uuidv4(), description: 'Thermostat Valve (Thermometer Valve)', amount: 2790.00 },
    { id: uuidv4(), description: 'Black Paste', amount: 0 },
    { id: uuidv4(), description: 'Clips', amount: 0 },
    { id: uuidv4(), description: 'Coolant Liquid', amount: 0 }
  ],
  manualTotalSpares: '',
  labourCharges: 1830.00,
  discount: 0,
  currency: 'Rs.'
};

// Number to Words Converter
function numberToWords(num) {
  if (num === 0) return 'Zero';
  const a = ['','One ','Two ','Three ','Four ', 'Five ','Six ','Seven ','Eight ','Nine ','Ten ','Eleven ','Twelve ','Thirteen ','Fourteen ','Fifteen ','Sixteen ','Seventeen ','Eighteen ','Nineteen '];
  const b = ['', '', 'Twenty','Thirty','Forty','Fifty', 'Sixty','Seventy','Eighty','Ninety'];
  const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return ''; 
  let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
  return str.trim() + ' Only';
}

function App() {
  const [companies, setCompanies] = useState(() => {
    const saved = localStorage.getItem('invoice_companies');
    return saved ? JSON.parse(saved) : [DEFAULT_COMPANY];
  });
  
  const [activeCompanyId, setActiveCompanyId] = useState(companies[0]?.id);
  const [invoice, setInvoice] = useState(DEFAULT_INVOICE);

  const activeCompany = companies.find(c => c.id === activeCompanyId) || companies[0];

  useEffect(() => {
    localStorage.setItem('invoice_companies', JSON.stringify(companies));
  }, [companies]);

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanies(companies.map(c => c.id === activeCompanyId ? { ...c, [name]: value } : c));
  };

  const handleInvoiceChange = (e) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const addCompany = () => {
    const newComp = { ...DEFAULT_COMPANY, id: uuidv4(), name: 'New Shop' };
    setCompanies([...companies, newComp]);
    setActiveCompanyId(newComp.id);
  };

  const removeCompany = (id) => {
    if (companies.length === 1) return;
    const newCompanies = companies.filter(c => c.id !== id);
    setCompanies(newCompanies);
    if (activeCompanyId === id) {
      setActiveCompanyId(newCompanies[0].id);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCompanies(companies.map(c => c.id === activeCompanyId ? { ...c, logo: reader.result } : c));
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { id: uuidv4(), description: '', amount: 0 }]
    });
  };

  const removeItem = (id) => {
    setInvoice({
      ...invoice,
      items: invoice.items.filter(item => item.id !== id)
    });
  };

  const updateItem = (id, field, value) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  // Calculations
  const calculatedSpares = invoice.items.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalSpares = invoice.manualTotalSpares !== '' && invoice.manualTotalSpares !== undefined 
    ? Number(invoice.manualTotalSpares) 
    : calculatedSpares;
    
  const grandTotal = totalSpares + Number(invoice.labourCharges || 0) - Number(invoice.discount || 0);

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handlePrint = async () => {
    const element = document.getElementById('invoice-preview');
    if (!element) return;
    
    // Save current state
    const originalScrollY = window.scrollY;
    const originalShadow = element.style.boxShadow;
    
    const previewSection = element.closest('.preview-section');
    const originalHeight = previewSection ? previewSection.style.height : '';
    const originalOverflow = previewSection ? previewSection.style.overflow : '';
    const originalPosition = previewSection ? previewSection.style.position : '';
    
    // Prepare for capture: remove shadow, expand container, and scroll to top
    element.style.boxShadow = 'none';
    if (previewSection) {
      previewSection.style.height = 'auto';
      previewSection.style.overflow = 'visible';
      previewSection.style.position = 'static';
    }
    window.scrollTo(0, 0);
    
    try {
      const canvas = await html2canvas(element, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: '#ffffff',
        scrollY: 0,
        windowHeight: element.scrollHeight
      });
      
      // Restore original state
      element.style.boxShadow = originalShadow;
      if (previewSection) {
        previewSection.style.height = originalHeight;
        previewSection.style.overflow = originalOverflow;
        previewSection.style.position = originalPosition;
      }
      window.scrollTo(0, originalScrollY);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Bill_${invoice.clientName || 'Export'}.pdf`);
    } catch (err) {
      console.error('PDF Export failed, falling back to print', err);
      
      // Restore on error as well
      element.style.boxShadow = originalShadow;
      if (previewSection) {
        previewSection.style.height = originalHeight;
        previewSection.style.overflow = originalOverflow;
        previewSection.style.position = originalPosition;
      }
      window.scrollTo(0, originalScrollY);
      
      window.print();
    }
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="app-title">
          <Car size={28} color="var(--primary-color)" />
          AutoBill Pro
        </div>
        <button className="btn btn-primary" onClick={handlePrint}>
          <Download size={18} /> Export / Print
        </button>
      </div>

      {/* Editor Section */}
      <div className="editor-section">
        <div className="company-selector">
          {companies.map(comp => (
            <div 
              key={comp.id}
              className={`company-pill ${activeCompanyId === comp.id ? 'active' : ''}`}
              onClick={() => setActiveCompanyId(comp.id)}
            >
              <Building size={14} />
              {comp.name}
              {companies.length > 1 && (
                <span onClick={(e) => { e.stopPropagation(); removeCompany(comp.id); }} className="pill-close">&times;</span>
              )}
            </div>
          ))}
          <button className="company-pill outline" onClick={addCompany}>
            <Plus size={14} /> Add Profile
          </button>
        </div>

        <div className="card mb-3">
          <div className="card-title"><Building size={18} /> Shop Branding</div>
          <div className="form-row">
            <div className="form-group">
              <label>Shop Name</label>
              <input type="text" name="name" value={activeCompany.name} onChange={handleCompanyChange} />
            </div>
            <div className="form-group">
              <label>Logo</label>
              <label className="btn btn-secondary btn-block" style={{ cursor: 'pointer', fontSize: '0.85rem', padding: '0.45rem' }}>
                <Upload size={14} /> {activeCompany.logo ? 'Change Logo' : 'Upload Logo'}
                <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: 'none' }} />
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone</label>
              <input type="text" name="phone" value={activeCompany.phone} onChange={handleCompanyChange} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="text" name="email" value={activeCompany.email} onChange={handleCompanyChange} />
            </div>
            <div className="form-group">
              <label>Website</label>
              <input type="text" name="website" value={activeCompany.website} onChange={handleCompanyChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Address</label>
            <textarea name="address" value={activeCompany.address} onChange={handleCompanyChange} rows={2}></textarea>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-title"><FileText size={18} /> Bill To & Vehicle Details</div>
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" value={invoice.date} onChange={handleInvoiceChange} />
            </div>
          </div>
          <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.5rem 0 1rem' }}></div>
          <div className="form-row">
            <div className="form-group">
              <label>Client Name</label>
              <input type="text" name="clientName" value={invoice.clientName} onChange={handleInvoiceChange} />
            </div>
            <div className="form-group">
              <label>Client Phone / Contact</label>
              <input type="text" name="clientPhone" value={invoice.clientPhone} onChange={handleInvoiceChange} />
            </div>
          </div>
          <div style={{ height: '1px', background: 'var(--border-color)', margin: '0.5rem 0 1rem' }}></div>
          <div className="form-row">
            <div className="form-group">
              <label>Vehicle Model</label>
              <input type="text" name="vehicleModel" value={invoice.vehicleModel} onChange={handleInvoiceChange} />
            </div>
            <div className="form-group">
              <label>Reg. No.</label>
              <input type="text" name="vehicleRegNo" value={invoice.vehicleRegNo} onChange={handleInvoiceChange} />
            </div>
            <div className="form-group">
              <label>Fuel Type</label>
              <select name="vehicleFuel" value={invoice.vehicleFuel} onChange={handleInvoiceChange}>
                <option value="">Select Fuel...</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="CNG">CNG</option>
                <option value="LPG">LPG</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-title">Parts / Spares</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {invoice.items.map((item, index) => (
              <div key={item.id} className="form-row" style={{ alignItems: 'center' }}>
                <div style={{ width: '20px', textAlign: 'center', fontWeight: 'bold' }}>{index + 1}</div>
                <div className="form-group mb-0" style={{ flex: 3 }}>
                  <input type="text" list="parts-list" placeholder="Description" value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} />
                </div>
                <div className="form-group mb-0" style={{ flex: 1 }}>
                  <input type="number" placeholder="Amount" value={item.amount || ''} onChange={(e) => updateItem(item.id, 'amount', Number(e.target.value))} />
                </div>
                <button 
                  onClick={() => removeItem(item.id)} 
                  style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '0.5rem' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button className="btn btn-outline mt-3 btn-block" onClick={addItem}>
            <Plus size={16} /> Add Spare Part
          </button>
        </div>

        <div className="card mb-4">
          <div className="card-title">Billing Totals</div>
          <div className="form-row">
            <div className="form-group">
              <label>Total Spares (Override Auto-calculation)</label>
              <input 
                type="number" 
                name="manualTotalSpares" 
                value={invoice.manualTotalSpares ?? ''} 
                onChange={handleInvoiceChange} 
                placeholder={`Auto: ${calculatedSpares}`} 
              />
            </div>
            <div className="form-group">
              <label>Labour Charges</label>
              <input type="number" name="labourCharges" value={invoice.labourCharges || ''} onChange={handleInvoiceChange} />
            </div>
            <div className="form-group">
              <label>Discount</label>
              <input type="number" name="discount" value={invoice.discount || ''} onChange={handleInvoiceChange} />
            </div>
          </div>
        </div>
      </div>

      {/* Preview Section - Exact match to new automotive image */}
      <div className="preview-section">
        <div className="preview-container" id="invoice-preview">
          
          {/* Top Banner (Black) */}
          <div className="car-banner">
            <div className="car-banner-left">
              {activeCompany.logo ? (
                <img src={activeCompany.logo} className="car-logo" alt="Logo" />
              ) : (
                <h1 className="car-logo-text"><span>SR</span>CARS</h1>
              )}
            </div>
            <div className="car-banner-right">
              <h2 className="car-bill-title">BILL</h2>
              <p className="car-date">Date: {invoice.date ? format(new Date(invoice.date), 'dd MMM yyyy') : ''}</p>
            </div>
          </div>

          {/* FROM / BILL TO */}
          <div className="car-addresses">
            <div className="car-from">
              <p className="car-red-label">FROM</p>
              <h3>{activeCompany.name}</h3>
              <p style={{whiteSpace: 'pre-line'}}>{activeCompany.address}</p>
              <p>Phone: {activeCompany.phone}</p>
              <p>Email: {activeCompany.email}</p>
              <p>Web: {activeCompany.website}</p>
            </div>
            <div className="car-to">
              <p className="car-red-label">BILL TO</p>
              <h3>{invoice.clientName}</h3>
              <p>Contact: {invoice.clientPhone}</p>
            </div>
          </div>

          {/* CAR DETAILS SECTION */}
          {(invoice.vehicleModel || invoice.vehicleRegNo || invoice.vehicleFuel) && (
            <div className="car-details-box">
              <p className="car-red-label-small">CAR DETAILS</p>
              <div className="car-details-grid">
                <div>
                  <p className="car-meta-lbl">Model</p>
                  <p className="car-meta-val">{invoice.vehicleModel}</p>
                </div>
                <div>
                  <p className="car-meta-lbl">Reg. No.</p>
                  <p className="car-meta-val">{invoice.vehicleRegNo}</p>
                </div>
                <div>
                  <p className="car-meta-lbl">Fuel</p>
                  <p className="car-meta-val">{invoice.vehicleFuel}</p>
                </div>
              </div>
            </div>
          )}

          {/* TABLE SECTION */}
          <table className="car-table">
            <thead>
              <tr>
                <th style={{width: '5%'}}>#</th>
                <th style={{width: '65%'}}>Description</th>
                <th style={{width: '30%', textAlign: 'right'}}>Amount ({invoice.currency})</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.description}</td>
                  <td style={{textAlign: 'right'}}>{item.amount > 0 ? formatCurrency(item.amount) : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* TOTALS SECTION */}
          <div className="car-totals">
            <div className="car-total-row spares-row">
              <div className="ct-label">Total Spares</div>
              <div className="ct-amount">{formatCurrency(totalSpares)}</div>
            </div>
            <div className="car-total-row labour-row">
              <div className="ct-label">Labour Charges</div>
              <div className="ct-amount">{formatCurrency(Number(invoice.labourCharges || 0))}</div>
            </div>
            {Number(invoice.discount) > 0 && (
              <div className="car-total-row" style={{ backgroundColor: '#fee2e2', borderBottom: '1px solid #fff', color: 'var(--car-red)' }}>
                <div className="ct-label">Discount</div>
                <div className="ct-amount">- {formatCurrency(Number(invoice.discount))}</div>
              </div>
            )}
            <div className="car-grand-total">
              <div className="ct-label">GRAND TOTAL</div>
              <div className="ct-amount">Rs. {formatCurrency(grandTotal)}</div>
            </div>
          </div>

          {/* Amount in words */}
          <p className="car-amount-words">
            Amount in words: <strong>Rupees {numberToWords(Math.floor(grandTotal))}</strong>
          </p>

          {/* FOOTER */}
          <div className="car-footer">
            <div className="car-sig-block">
              <div className="car-sig-line"></div>
              <p>Customer Signature</p>
            </div>
            <div className="car-sig-block right-sig">
              <p className="for-company">For <strong>{activeCompany.name}</strong></p>
              <p className="auth-sign">Authorised Signature</p>
            </div>
          </div>
          
          <div className="car-thankyou">
            Thank you for choosing {activeCompany.name.split(' ')[0]} {activeCompany.name.split(' ')[1] || 'Cars'}!
          </div>

        </div>
      </div>
      
      <datalist id="parts-list">
        {AUTO_PARTS.map(part => (
          <option key={part} value={part} />
        ))}
      </datalist>
    </div>
  );
}

export default App;
