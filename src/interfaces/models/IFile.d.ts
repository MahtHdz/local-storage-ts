interface IFile {
  filename: string;
  alias: string;
  filepath: string;
  size: number;
  extension : string;
  owner: string;
  status: boolean;
}

export default IFile;