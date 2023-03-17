import { DragDropContainer, DropTarget } from 'react-drag-drop-container';

export function ParagraphGame() {
  return (
    <div>
      <h1>Paragraph GAME</h1>
      <main>
        CONTENIDO DRAGGABLE HERE
        <div>
          <DragDropContainer targetKey="foo">
            <div className="w-[120px] h-[100px] bg-green-400">DRAG ME BRO</div>
          </DragDropContainer>
        </div>
        <div>
          <DropTarget targetKey="foo">
            <div
              className="bg-red-500 text-white p-1
            w-[220px]
            h-[220px]
            "
            >
              DROP ZONE
            </div>
          </DropTarget>
        </div>
      </main>
    </div>
  );
}
