"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExternalLink } from "lucide-react"

export function SizeChartModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-blue-600 hover:text-blue-800 p-0 h-auto text-sm">
          <ExternalLink className="h-3 w-3 mr-1" />
          Size Chart
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Size Chart Guide</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="male" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="male">Male</TabsTrigger>
            <TabsTrigger value="female">Female</TabsTrigger>
          </TabsList>

          <TabsContent value="male" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Men's Size Chart</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">US Size</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">UK Size</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">EU Size</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Foot Length (cm)</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Foot Length (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">6</td>
                      <td className="border border-gray-300 px-4 py-2">5.5</td>
                      <td className="border border-gray-300 px-4 py-2">39</td>
                      <td className="border border-gray-300 px-4 py-2">24.1</td>
                      <td className="border border-gray-300 px-4 py-2">9.5</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">7</td>
                      <td className="border border-gray-300 px-4 py-2">6.5</td>
                      <td className="border border-gray-300 px-4 py-2">40</td>
                      <td className="border border-gray-300 px-4 py-2">24.8</td>
                      <td className="border border-gray-300 px-4 py-2">9.75</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">8</td>
                      <td className="border border-gray-300 px-4 py-2">7.5</td>
                      <td className="border border-gray-300 px-4 py-2">41</td>
                      <td className="border border-gray-300 px-4 py-2">25.4</td>
                      <td className="border border-gray-300 px-4 py-2">10</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">9</td>
                      <td className="border border-gray-300 px-4 py-2">8.5</td>
                      <td className="border border-gray-300 px-4 py-2">42</td>
                      <td className="border border-gray-300 px-4 py-2">26.0</td>
                      <td className="border border-gray-300 px-4 py-2">10.25</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">10</td>
                      <td className="border border-gray-300 px-4 py-2">9.5</td>
                      <td className="border border-gray-300 px-4 py-2">43</td>
                      <td className="border border-gray-300 px-4 py-2">26.7</td>
                      <td className="border border-gray-300 px-4 py-2">10.5</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">11</td>
                      <td className="border border-gray-300 px-4 py-2">10.5</td>
                      <td className="border border-gray-300 px-4 py-2">44</td>
                      <td className="border border-gray-300 px-4 py-2">27.3</td>
                      <td className="border border-gray-300 px-4 py-2">10.75</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">12</td>
                      <td className="border border-gray-300 px-4 py-2">11.5</td>
                      <td className="border border-gray-300 px-4 py-2">45</td>
                      <td className="border border-gray-300 px-4 py-2">28.0</td>
                      <td className="border border-gray-300 px-4 py-2">11</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="female" className="mt-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Women's Size Chart</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">US Size</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">UK Size</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">EU Size</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Foot Length (cm)</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Foot Length (inches)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">5</td>
                      <td className="border border-gray-300 px-4 py-2">3</td>
                      <td className="border border-gray-300 px-4 py-2">35</td>
                      <td className="border border-gray-300 px-4 py-2">22.2</td>
                      <td className="border border-gray-300 px-4 py-2">8.75</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">6</td>
                      <td className="border border-gray-300 px-4 py-2">4</td>
                      <td className="border border-gray-300 px-4 py-2">36</td>
                      <td className="border border-gray-300 px-4 py-2">22.9</td>
                      <td className="border border-gray-300 px-4 py-2">9</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">7</td>
                      <td className="border border-gray-300 px-4 py-2">5</td>
                      <td className="border border-gray-300 px-4 py-2">37</td>
                      <td className="border border-gray-300 px-4 py-2">23.5</td>
                      <td className="border border-gray-300 px-4 py-2">9.25</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">8</td>
                      <td className="border border-gray-300 px-4 py-2">6</td>
                      <td className="border border-gray-300 px-4 py-2">38</td>
                      <td className="border border-gray-300 px-4 py-2">24.1</td>
                      <td className="border border-gray-300 px-4 py-2">9.5</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">9</td>
                      <td className="border border-gray-300 px-4 py-2">7</td>
                      <td className="border border-gray-300 px-4 py-2">39</td>
                      <td className="border border-gray-300 px-4 py-2">24.8</td>
                      <td className="border border-gray-300 px-4 py-2">9.75</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">10</td>
                      <td className="border border-gray-300 px-4 py-2">8</td>
                      <td className="border border-gray-300 px-4 py-2">40</td>
                      <td className="border border-gray-300 px-4 py-2">25.4</td>
                      <td className="border border-gray-300 px-4 py-2">10</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">11</td>
                      <td className="border border-gray-300 px-4 py-2">9</td>
                      <td className="border border-gray-300 px-4 py-2">41</td>
                      <td className="border border-gray-300 px-4 py-2">26.0</td>
                      <td className="border border-gray-300 px-4 py-2">10.25</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">How to Measure Your Feet:</h4>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Place your foot on a piece of paper</li>
            <li>2. Mark the longest toe and back of your heel</li>
            <li>3. Measure the distance between the marks</li>
            <li>4. Add 0.5cm for comfort</li>
            <li>5. Compare with our size chart above</li>
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  )
}
