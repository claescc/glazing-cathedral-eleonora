import Foundation
import Vision
import ImageIO

// OCR is a finding aid. It never promotes a formula to a checked transcription.
for path in CommandLine.arguments.dropFirst() {
    autoreleasepool {
        let output = path + ".ocr.json"
        if FileManager.default.fileExists(atPath: output) { return }
        do {
            let request = VNRecognizeTextRequest()
            request.recognitionLevel = .accurate
            request.usesLanguageCorrection = false
            let handler = VNImageRequestHandler(url: URL(fileURLWithPath: path))
            try handler.perform([request])
            let observations = request.results ?? []
            let lines = observations.compactMap { $0.topCandidates(1).first }
            let result: [String: Any] = [
                "text": lines.map { $0.string }.joined(separator: "\n"),
                "meanConfidence": lines.isEmpty ? 0 : lines.map { Double($0.confidence) }.reduce(0,+) / Double(lines.count),
                "method": "Apple Vision accurate OCR; language correction disabled; unverified"
            ]
            try JSONSerialization.data(withJSONObject: result).write(to: URL(fileURLWithPath: output), options: .atomic)
        } catch {
            fputs("OCR failed: \(path): \(error)\n", stderr)
            exit(1)
        }
    }
}
