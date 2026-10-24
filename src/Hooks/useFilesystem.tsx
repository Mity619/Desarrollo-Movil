import { useState } from "react";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

export const useFilesystem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const writeFile = async (path: string, data: any) => {
    try {
      setLoading(true);
      await Filesystem.writeFile({
        path,
        data: JSON.stringify(data),
        directory: Directory.Documents,
        encoding: Encoding.UTF8, 
      });
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const readFile = async (path: string) => {
    try {
      setLoading(true);
      const result = await Filesystem.readFile({ path, directory: Directory.Documents, encoding: Encoding.UTF8 });
      return typeof result.data === 'string' ? JSON.parse(result.data) : result.data;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, writeFile, readFile };
};