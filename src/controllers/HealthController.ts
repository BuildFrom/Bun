import { HttpResponse } from "@/utils/elysia-strategy";
import os from "os";

class HealthController {
  async info(): Promise<HttpResponse> {
    const cpu = process.cpuUsage();
    const totalRAM = os.totalmem();
    const freeRAM = os.freemem();

    const usedCPU = {
      user: (cpu.user / 1e6).toFixed(2),
      system: (cpu.system / 1e6).toFixed(2),
    };

    const tmb = (totalRAM / (1024 * 1024)).toFixed(2);
    const fmb = (freeRAM / (1024 * 1024)).toFixed(2);

    return {
      data: {
        usedCPU: {
          user: `${usedCPU.user} s`,
          system: `${usedCPU.system} s`,
        },
        totalRAM: `${tmb} MB`,
        freeRAM: `${fmb} MB`,
      },
      statusCode: 200,
    };
  }
}

export default HealthController;
