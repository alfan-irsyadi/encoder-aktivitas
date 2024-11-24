import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const EncodingConverter = () => {
  const [textInput1, setTextInput1] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState('');

  interface ObjectLiteral {
    [key: string]: string;
  }

  const kelas: ObjectLiteral = {
    "Medan Baru - Kelas 11 - L02": "24251321132L020",
    "Medan Baru - Kelas 09 - P01": "24251321132P010",
    "Medan Baru - Kelas Ronin - O01": "24251324132O010",
    "Medan Baru - Kelas 11 - L01": "24251321132L010",
    "Medan Baru - Kelas 08 - G01": "24251321132G010",
    "Medan Baru - Kelas 12 - Z01": "2425132B132Z010",
    "Medan Baru - Kelas 12 - Z02": "2425132B132Z020"
  }
  const options = Object.keys(kelas)

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const processInputs = (input1:string, input2:string) => {
    if (input1 && input2) {
      const base64Input1 = btoa(input1);
      const base64Input2 = btoa(kelas[input2]);
      const urlEncodedInput1 = encodeURIComponent(base64Input1);
      const urlEncodedInput2 = encodeURIComponent(base64Input2);
      const finalResult = `https://emodul.bimbelnurulfikri.id/belajar/presensi/${urlEncodedInput2}/${urlEncodedInput1}`;
      setResult(finalResult);
    } else {
      setResult('');
    }
  };

  const handleTextInput1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTextInput1(value);
    processInputs(value, selectedOption);
  };

  const handleOptionSelect = (option:string) => {
    setSelectedOption(option);
    processInputs(textInput1, option);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-black flex items-center justify-center">
      <Card className="w-full max-w-xl bg-white/70 dark:bg-black/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-2xl rounded-xl">
        <CardHeader className="border-b border-gray-200 dark:border-gray-800">
          <CardTitle className="text-gray-800 dark:text-gray-100 text-xl font-light">
            Encoder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          {/* Text Input */}
          <div className="space-y-2">
            <Label 
              htmlFor="textInput1" 
              className="text-sm font-light text-gray-600 dark:text-gray-300"
            >
              Tanggal
            </Label>
            <Input
              id="textInput1"
              value={textInput1}
              onChange={handleTextInput1Change}
              placeholder="Enter first input"
              className="bg-white/50 dark:bg-black/50 border-gray-200 dark:border-gray-700 
                       text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                       backdrop-blur-sm focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 
                       focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Searchable Dropdown */}
          <div className="space-y-2">
            <Label 
              htmlFor="searchDropdown" 
              className="text-sm font-light text-gray-600 dark:text-gray-300"
            >
              Kelas
            </Label>
            <div className="relative">
              <Input
                id="searchDropdown"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search options..."
                className="bg-white/50 dark:bg-black/50 border-gray-200 dark:border-gray-700 
                         text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                         backdrop-blur-sm focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 
                         focus:border-transparent transition-all duration-200"
              />
              
              {searchQuery && (
                <div className="absolute w-full mt-1 bg-white/80 dark:bg-black/80 backdrop-blur-md 
                              border border-gray-200 dark:border-gray-800 rounded-md shadow-lg 
                              max-h-48 overflow-y-auto z-10">
                  {filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer 
                               text-gray-800 dark:text-gray-100 transition-colors duration-200"
                      onClick={() => {
                        handleOptionSelect(option);
                        setSearchQuery('');
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {selectedOption && (
              <div className="text-sm text-gray-500 dark:text-gray-400 font-light">
                Selected: {selectedOption}
              </div>
            )}
          </div>

          {/* Result */}
          {result && (
            <div className="space-y-2 pt-4">
              <Label className="text-sm font-light text-gray-600 dark:text-gray-300">
                Result
              </Label>
              <div className="p-4 bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-md 
                            border border-gray-200 dark:border-gray-800
                            text-gray-800 dark:text-gray-100 font-light break-all">
                <a href={result}>{result}</a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EncodingConverter;